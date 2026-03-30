'use client';

import { useEffect, useState, useCallback } from 'react';
import {
  isMidiSupported,
  requestMidiAccess,
  findEvolverPorts,
  listMidiDevices,
  type MidiDevice,
} from '@/lib/midi/connection';
import { StatusIndicator } from './status-indicator';

interface MidiConnectionProps {
  onConnectionChange: (state: {
    input: MIDIInput | null;
    output: MIDIOutput | null;
    status: 'unsupported' | 'detecting' | 'disconnected' | 'connected';
    deviceName: string | null;
  }) => void;
}

export function MidiConnection({ onConnectionChange }: MidiConnectionProps) {
  const [status, setStatus] = useState<'unsupported' | 'detecting' | 'disconnected' | 'connected'>('detecting');
  const [deviceName, setDeviceName] = useState<string | null>(null);
  const [access, setAccess] = useState<MIDIAccess | null>(null);
  const [devices, setDevices] = useState<{ inputs: MidiDevice[]; outputs: MidiDevice[] }>({ inputs: [], outputs: [] });
  const [selectedInputId, setSelectedInputId] = useState<string | null>(null);
  const [selectedOutputId, setSelectedOutputId] = useState<string | null>(null);

  const connectToDevice = useCallback((midiAccess: MIDIAccess, inputId?: string, outputId?: string) => {
    if (inputId && outputId) {
      let input: MIDIInput | null = null;
      let output: MIDIOutput | null = null;
      midiAccess.inputs.forEach((port) => { if (port.id === inputId) input = port; });
      midiAccess.outputs.forEach((port) => { if (port.id === outputId) output = port; });
      if (input && output) {
        const name = (input as MIDIInput).name ?? 'MIDI Device';
        setStatus('connected');
        setDeviceName(name);
        onConnectionChange({ input, output, status: 'connected', deviceName: name });
        return;
      }
    }

    const ports = findEvolverPorts(midiAccess);
    if (ports.input && ports.output) {
      const name = ports.input.name ?? 'MIDI Device';
      setStatus('connected');
      setDeviceName(name);
      setSelectedInputId(ports.input.id);
      setSelectedOutputId(ports.output.id);
      onConnectionChange({ input: ports.input, output: ports.output, status: 'connected', deviceName: name });
    } else {
      setStatus('disconnected');
      setDeviceName(null);
      onConnectionChange({ input: null, output: null, status: 'disconnected', deviceName: null });
    }
  }, [onConnectionChange]);

  useEffect(() => {
    if (!isMidiSupported()) {
      setStatus('unsupported');
      onConnectionChange({ input: null, output: null, status: 'unsupported', deviceName: null });
      return;
    }

    let midiAccess: MIDIAccess | null = null;

    requestMidiAccess()
      .then((ma) => {
        midiAccess = ma;
        setAccess(ma);
        const deviceList = listMidiDevices(ma);
        setDevices(deviceList);
        connectToDevice(ma);

        ma.onstatechange = () => {
          const updated = listMidiDevices(ma);
          setDevices(updated);
          connectToDevice(ma);
        };
      })
      .catch(() => {
        setStatus('unsupported');
        onConnectionChange({ input: null, output: null, status: 'unsupported', deviceName: null });
      });

    return () => {
      if (midiAccess) {
        midiAccess.onstatechange = null;
      }
    };
  }, [connectToDevice, onConnectionChange]);

  const handleDeviceSelect = (inputId: string, outputId: string) => {
    setSelectedInputId(inputId);
    setSelectedOutputId(outputId);
    if (access) {
      connectToDevice(access, inputId, outputId);
    }
  };

  if (status === 'unsupported') {
    return (
      <div className="bg-surface rounded-[6px] p-lg border border-accent/30">
        <h3 className="text-[20px] font-bold mb-sm text-accent">Web MIDI Not Supported</h3>
        <p className="text-sm text-muted">
          Your browser does not support Web MIDI. Use Chrome or Edge to connect your Evolver.
        </p>
      </div>
    );
  }

  return (
    <div>
      <StatusIndicator status={status} deviceName={deviceName} />

      {status === 'disconnected' && (
        <p className="text-sm text-muted mt-sm">
          Connect your Evolver via USB-MIDI and refresh the page, or select a device manually from the dropdown.
        </p>
      )}

      {devices.inputs.length > 1 && (
        <div className="mt-md flex items-center gap-md">
          <label className="text-sm text-muted" htmlFor="midi-device-select">Device:</label>
          <select
            id="midi-device-select"
            className="bg-bg text-text text-sm border border-muted/30 rounded-[6px] px-sm py-xs min-h-[44px]"
            value={selectedInputId ?? ''}
            onChange={(e) => {
              const idx = devices.inputs.findIndex((d) => d.id === e.target.value);
              if (idx >= 0 && devices.outputs[idx]) {
                handleDeviceSelect(devices.inputs[idx].id, devices.outputs[idx].id);
              }
            }}
          >
            {devices.inputs.map((d) => (
              <option key={d.id} value={d.id}>{d.name}</option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}
