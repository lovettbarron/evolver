'use client';

import React, { useState, useRef, useCallback, memo } from 'react';
import { motion } from 'motion/react';
import { clsx } from 'clsx';
import {
  CONTROL_METADATA,
  SECTION_BOUNDS,
  midiToRotation,
  midiToSliderPosition,
} from '@/lib/cascadia-panel-data';
import type { CascadiaControlMeta } from '@/lib/cascadia-panel-data';
import { PanelTooltip } from './evolver-panel-tooltip';

// ===== Types =====

interface CascadiaPanelProps {
  knobValues?: Record<string, number>;
  highlights?: Array<{ controlId: string; color: 'blue' | 'amber' }>;
  activeSections?: string[];
  zoomSections?: string[];
  cables?: Array<{
    sourceId: string;
    destId: string;
    signalType: 'audio' | 'cv' | 'modulation' | 'default';
    purpose?: string;
  }>;
  onKnobChange?: (controlId: string, value: number) => void;
  className?: string;
}

// ===== Cable Colors =====

const CABLE_COLORS: Record<string, string> = {
  audio: '#ff6644',
  cv: '#3388ff',
  modulation: '#ffaa33',
  default: '#888888',
};

// ===== Module order for layout =====

const MODULE_ORDER = [
  'midi-cv', 'vco-a', 'vco-b', 'envelope-a', 'envelope-b',
  'line-in', 'mixer', 'vcf', 'wave-folder', 'vca-a',
  'push-gate', 'utilities', 'lfo-xyz', 'patchbay',
  'vca-b-lpf', 'fx-send-return', 'output-control',
] as const;

// ===== Module display names =====

const MODULE_DISPLAY_NAMES: Record<string, string> = {
  'midi-cv': 'MIDI/CV',
  'vco-a': 'VCO A',
  'vco-b': 'VCO B',
  'envelope-a': 'ENV A',
  'envelope-b': 'ENV B',
  'line-in': 'LINE IN',
  'mixer': 'MIXER',
  'vcf': 'VCF',
  'wave-folder': 'FOLD',
  'vca-a': 'VCA A',
  'push-gate': 'GATE',
  'utilities': '',
  'lfo-xyz': 'LFO XYZ',
  'patchbay': '',
  'vca-b-lpf': 'VCA B/LPF',
  'fx-send-return': '',
  'output-control': '',
};

// ===== Hand-placed control positions matching physical Cascadia panel =====
// ViewBox: 0 0 1000 640
// Top strip (y:5-55): FX Send/Return, Output Control
// Row 1 (y:65-290): MIDI/CV, Line In, Mixer, VCF, Wave Folder, VCA A
// Row 2 (y:300-495): Utilities (S&H, Slew, Mixuverter), LFO XYZ, Patchbay, VCA B/LPF, Push Gate
// Row 3 (y:505-740): VCO B, VCO A, Envelope A, Envelope B

interface ControlPosition { x: number; y: number }

const CONTROL_POSITIONS: Record<string, ControlPosition> = {
  // ===== TOP STRIP (right ~65%, y:5-55) =====
  // FX Send/Return — all in a single row, SEND aligned at x:234
  'knob-fx-send-return-send-level':   { x: 234, y: 30 },
  'jack-fx-send-return-send':         { x: 270, y: 30 },
  'switch-fx-send-return-level-type': { x: 310, y: 25 },
  'switch-fx-send-return-phase':      { x: 340, y: 25 },
  'knob-fx-send-return-return-level': { x: 385, y: 30 },
  'knob-fx-send-return-dry-wet':      { x: 440, y: 30 },
  // FX MIX, FOLD, VCA A grouped together
  'jack-fx-send-return-mix':          { x: 500, y: 30 },
  'jack-output-control-fold-out':     { x: 540, y: 30 },
  'jack-output-control-vca-a-out':    { x: 580, y: 30 },
  // MAIN 1 and 2 together
  'jack-output-control-main-1-in':    { x: 640, y: 30 },
  'jack-output-control-main-2-in':    { x: 675, y: 30 },
  // DRIVE → SOFT CLIP → MAIN out → LEVEL
  'knob-output-control-drive':        { x: 740, y: 30 },
  'switch-output-control-soft-clip':  { x: 800, y: 25 },
  'jack-output-control-main-out':     { x: 860, y: 30 },
  'knob-output-control-level':        { x: 940, y: 30 },

  // ===== ROW 1 (y:72-280) =====
  // EXT IN (top strip, above MIDI+CV x:5-95) — PITCH, GATE, TRIG
  'jack-midi-cv-pitch-in':       { x: 25, y: 30 },
  'jack-midi-cv-gate-in':        { x: 50, y: 30 },
  'jack-midi-cv-trig-in':        { x: 75, y: 30 },
  // MIDI+CV (x:5-95) — 8 output jacks in 2-column x 4-row grid
  'jack-midi-cv-pitch-out':      { x: 30, y: 95 },
  'jack-midi-cv-vel-out':        { x: 68, y: 95 },
  'jack-midi-cv-cc-out':         { x: 30, y: 130 },
  'jack-midi-cv-mod-out':        { x: 68, y: 130 },
  'jack-midi-cv-lfo-out':        { x: 30, y: 165 },
  'jack-midi-cv-gate-out':       { x: 68, y: 165 },
  'jack-midi-cv-clk-out':        { x: 30, y: 200 },
  'jack-midi-cv-trig-out':       { x: 68, y: 200 },

  // Line In (x:100-155)
  'slider-line-in-level':  { x: 128, y: 88 },
  'jack-line-in-out':      { x: 128, y: 200 },

  // Mixer (x:160-365) — 6 sliders left, switches stacked far right, jacks below sliders
  'slider-mixer-in-1':          { x: 178, y: 82 },
  'slider-mixer-in-2':          { x: 206, y: 82 },
  'slider-mixer-pulse':         { x: 234, y: 82 },
  'slider-mixer-saw':           { x: 262, y: 82 },
  'slider-mixer-sub':           { x: 290, y: 82 },
  'slider-mixer-noise':         { x: 318, y: 82 },
  'switch-mixer-sub-type':      { x: 352, y: 90 },
  'switch-mixer-noise-type':    { x: 352, y: 130 },
  'switch-mixer-soft-clip':     { x: 352, y: 165 },
  'jack-mixer-in-1':            { x: 178, y: 200 },
  'jack-mixer-in-2':            { x: 203, y: 200 },
  'jack-mixer-vco-a-tri-out':   { x: 228, y: 200 },
  'jack-mixer-vco-a-saw-out':   { x: 253, y: 200 },
  'jack-mixer-vco-a-pulse-out': { x: 278, y: 200 },
  'jack-mixer-noise-out':       { x: 303, y: 200 },
  'jack-mixer-out':             { x: 352, y: 200 },

  // VCF (x:370-610) — sliders: FM1-3, QM, then MODE selector, then FREQ, Q sliders
  'slider-vcf-fm-1':     { x: 385, y: 82 },
  'slider-vcf-fm-2':     { x: 415, y: 82 },
  'slider-vcf-fm-3':     { x: 445, y: 82 },
  'slider-vcf-qm':       { x: 475, y: 82 },
  'knob-vcf-mode':       { x: 520, y: 105 },
  'slider-vcf-freq':     { x: 565, y: 82 },
  'slider-vcf-q':        { x: 595, y: 82 },
  'knob-vcf-level':      { x: 520, y: 155 },
  'jack-vcf-fm-1-in':    { x: 385, y: 200 },
  'jack-vcf-fm-2-in':    { x: 415, y: 200 },
  'jack-vcf-fm-3-in':    { x: 445, y: 200 },
  'jack-vcf-q-mod-in':   { x: 475, y: 200 },
  'jack-vcf-in':         { x: 520, y: 200 },
  'jack-vcf-lp4-out':    { x: 555, y: 200 },
  'jack-vcf-hp4-out':    { x: 585, y: 200 },
  'jack-vcf-out':        { x: 600, y: 200 },

  // Wave Folder (x:615-700) — Mod and Fold sliders, jacks below
  'slider-wave-folder-mod':    { x: 640, y: 82 },
  'slider-wave-folder-fold':   { x: 675, y: 82 },
  'jack-wave-folder-mod-in':   { x: 640, y: 200 },
  'jack-wave-folder-in':       { x: 675, y: 200 },

  // VCA A (x:720-900) — sliders and jacks, centered
  'slider-vca-a-aux-in':       { x: 760, y: 82 },
  'slider-vca-a-level-mod':    { x: 810, y: 82 },
  'slider-vca-a-level':        { x: 860, y: 82 },
  'jack-vca-a-aux-in':         { x: 760, y: 200 },
  'jack-vca-a-in':             { x: 810, y: 200 },
  'jack-vca-a-level-mod-in':   { x: 860, y: 200 },

  // ===== LEFT COLUMN — S&H + VCO B (x:5-150, spans rows 2+3) =====
  // S&H (x:5-150, center=77, y:244-330)
  'led-utilities-sh':             { x: 77, y: 265 },
  'jack-utilities-sh-trig-in':    { x: 42, y: 295 },
  'jack-utilities-sh-in':         { x: 77, y: 295 },
  'jack-utilities-sh-out':        { x: 112, y: 295 },

  // VCO B (x:5-150, center=77, y:345-560)
  // Row 1 jacks: PITCH IN, SYNC IN, SINE
  'jack-vco-b-pitch-in':     { x: 37, y: 360 },
  'jack-vco-b-sync-in':      { x: 77, y: 360 },
  'jack-vco-b-sine-out':     { x: 117, y: 360 },
  // Row 2 jacks: TRIANGLE, SAW, SQUARE
  'jack-vco-b-triangle-out': { x: 37, y: 388 },
  'jack-vco-b-saw-out':      { x: 77, y: 388 },
  'jack-vco-b-square-out':   { x: 117, y: 388 },
  // Pitch knob center-left, pitch source 2-way aligned right
  'knob-vco-b-pitch':        { x: 60, y: 430 },
  'switch-vco-b-pitch-source':{ x: 130, y: 425 },
  'led-vco-b-rate':          { x: 130, y: 448 },
  // Octave selector below, VCO/LFO switch aligned right
  'knob-vco-b-octave':       { x: 60, y: 510 },
  'switch-vco-b-vco-lfo':    { x: 130, y: 510 },

  // ===== ROW 2 (y:244-425, x:155-995) =====
  // Utilities — Slew/Env Follow (x:155-290)
  // Top row: 3-way slew direction switch left, rate knob right
  'switch-utilities-slew-direction':{ x: 185, y: 280 },
  'knob-utilities-slew-rate':       { x: 230, y: 278 },
  // Middle: two 2-way switches
  'switch-utilities-slew-shape':    { x: 185, y: 325 },
  'switch-utilities-env-follow':    { x: 225, y: 325 },
  // Bottom: input and output jacks
  'jack-utilities-slew-in':         { x: 205, y: 360 },
  'jack-utilities-slew-out':        { x: 245, y: 360 },
  // Utilities — Mixuverter (x:295-415)
  // Top: x2 switch left, attenuator knob center, polarity switch right
  'switch-utilities-x2':            { x: 315, y: 270 },
  'knob-utilities-attenuator':      { x: 355, y: 275 },
  'switch-utilities-polarity':      { x: 395, y: 270 },
  // Middle row: 2 input jacks
  'jack-utilities-main-input':      { x: 330, y: 320 },
  'jack-utilities-secondary-input': { x: 380, y: 320 },
  // Bottom row: 3 output jacks
  'jack-utilities-mixuverter-out-a':{ x: 320, y: 360 },
  'jack-utilities-mixuverter-out-b':{ x: 355, y: 360 },
  'jack-utilities-mixuverter-out-c':{ x: 390, y: 360 },

  // LFO XYZ (x:420-570)
  // Top: rate knob left, rate CV jack right
  'knob-lfo-xyz-rate':       { x: 455, y: 275 },
  'jack-lfo-xyz-rate-cv':    { x: 530, y: 275 },
  // Middle: 2-way divider switches
  'switch-lfo-xyz-y-divider':{ x: 495, y: 325 },
  'switch-lfo-xyz-z-divider':{ x: 535, y: 325 },
  // Bottom: 3 output jacks
  'jack-lfo-xyz-x-out':      { x: 455, y: 360 },
  'jack-lfo-xyz-y-out':      { x: 495, y: 360 },
  'jack-lfo-xyz-z-out':      { x: 535, y: 360 },

  // Patchbay (x:580-810) — sub-sections: MULTS, SUM, INVERT, BI►UNI, EXPR SRC
  // MULTS — 3 inputs top, 3 outputs middle, 3 outputs bottom
  'jack-patchbay-mult-in-1':     { x: 595, y: 270 },
  'jack-patchbay-mult-in-2':     { x: 625, y: 270 },
  'jack-patchbay-mult-in-3':     { x: 655, y: 270 },
  'jack-patchbay-mult-out-1':    { x: 595, y: 315 },
  'jack-patchbay-mult-out-2':    { x: 625, y: 315 },
  'jack-patchbay-mult-out-3':    { x: 655, y: 315 },
  // SUM — 2 inputs top, 1 output bottom
  'jack-patchbay-sum-in-1':      { x: 690, y: 270 },
  'jack-patchbay-sum-in-2':      { x: 690, y: 300 },
  'jack-patchbay-sum-out':       { x: 690, y: 360 },
  // INVERT — 1 input top, 1 output bottom
  'jack-patchbay-inverter-in':   { x: 720, y: 270 },
  'jack-patchbay-inverter-out':  { x: 720, y: 360 },
  // BI►UNI — 1 input top, 1 output bottom
  'jack-patchbay-bi-in':         { x: 755, y: 270 },
  'jack-patchbay-uni-out':       { x: 755, y: 360 },
  // EXPR SRC — knob top right, input jack below
  'knob-patchbay-exp-level':     { x: 795, y: 278 },
  'jack-patchbay-exp-src-in':    { x: 795, y: 360 },
  // RING MOD — own column between patchbay and VCA B/LPF
  'jack-patchbay-ringmod-in-1':  { x: 835, y: 275 },
  'jack-patchbay-ringmod-in-2':  { x: 870, y: 275 },
  'jack-patchbay-ringmod-out':   { x: 853, y: 360 },

  // VCA B/LPF (x:900-1000) — in top-left, knob top-right, cv+switch mid, outputs bottom
  'jack-vca-b-lpf-in':           { x: 920, y: 275 },
  'knob-vca-b-lpf-cv-amount':    { x: 970, y: 278 },
  'led-vca-b-lpf-cv-level':      { x: 970, y: 258 },
  'switch-vca-b-lpf-vca-control':{ x: 945, y: 320 },
  'jack-vca-b-lpf-cv-in':        { x: 920, y: 360 },
  'jack-vca-b-lpf-vca-out':      { x: 950, y: 360 },
  'jack-vca-b-lpf-out':          { x: 980, y: 360 },

  // Push Gate (far right, Row 3)
  // Push Gate — manual button top, gate output below
  'switch-push-gate-manual': { x: 985, y: 460 },
  'jack-push-gate-out':      { x: 985, y: 555 },

  // ===== ROW 3 (y:400-620, x:155-995) =====
  // VCO A (x:155-465) — 6 jacks top, TZFM/AC-DC top-right, switches under SYNC, sliders under jacks, PITCH+OCTAVE right
  'jack-vco-a-pitch-in':      { x: 180, y: 420 },
  'jack-vco-a-pwm-in':        { x: 215, y: 420 },
  'jack-vco-a-fm-1-in':       { x: 255, y: 420 },
  'jack-vco-a-im-in':         { x: 295, y: 420 },
  'jack-vco-a-fm-2-in':       { x: 335, y: 420 },
  'jack-vco-a-sync-in':       { x: 370, y: 420 },
  'switch-vco-a-tzfm':        { x: 410, y: 420 },
  'switch-vco-a-ac-dc':       { x: 440, y: 420 },
  // 2 switches stacked under PITCH IN on the left
  'switch-vco-a-sync-type':   { x: 180, y: 480 },
  'switch-vco-a-pulse-position':{ x: 180, y: 520 },
  // 5 sliders aligned under PWM, FM1, IM, FM2, SYNC jacks
  'slider-vco-a-pw-mod':      { x: 215, y: 455 },
  'slider-vco-a-pw':          { x: 255, y: 455 },
  'slider-vco-a-fm-1':        { x: 295, y: 455 },
  'slider-vco-a-index-mod':   { x: 335, y: 455 },
  'slider-vco-a-index':       { x: 370, y: 455 },
  // PITCH knob right, OCTAVE directly below — bottom of octave aligns with slider bottoms
  'knob-vco-a-pitch':         { x: 430, y: 460 },
  'knob-vco-a-octave':        { x: 430, y: 515 },

  // Envelope A (x:470-725) — 6 jacks top, H slider first, 3 switches stacked, then A,D,S,R sliders
  'jack-envelope-a-gate-in':        { x: 490, y: 415 },
  'jack-envelope-a-ctrl-in':        { x: 525, y: 415 },
  'jack-envelope-a-retrig-in':      { x: 560, y: 415 },
  'jack-envelope-a-eoh-out':        { x: 610, y: 415 },
  'jack-envelope-a-eoa-out':        { x: 650, y: 415 },
  'jack-envelope-a-out':            { x: 690, y: 415 },
  // H slider first (leftmost)
  'slider-envelope-a-hold':         { x: 490, y: 450 },
  // 3 switches stacked next to H
  'switch-envelope-a-hold-position':{ x: 525, y: 470 },
  'switch-envelope-a-speed':        { x: 525, y: 510 },
  'switch-envelope-a-ctrl-source':  { x: 525, y: 550 },
  // A, D, S, R sliders
  'slider-envelope-a-attack':       { x: 575, y: 450 },
  'slider-envelope-a-decay':        { x: 615, y: 450 },
  'slider-envelope-a-sustain':      { x: 655, y: 450 },
  'slider-envelope-a-release':      { x: 695, y: 450 },

  // Envelope B (x:730-960) — 6 jacks top, sliders aligned under jacks, switches far right
  'jack-envelope-b-rise-mod-in': { x: 750, y: 415 },
  'jack-envelope-b-fall-mod-in': { x: 785, y: 415 },
  'jack-envelope-b-shape-mod-in':{ x: 820, y: 415 },
  'jack-envelope-b-gate-sync-in':{ x: 855, y: 415 },
  'jack-envelope-b-eof-out':     { x: 895, y: 415 },
  'jack-envelope-b-out':         { x: 930, y: 415 },
  'led-envelope-b-sync':         { x: 955, y: 410 },
  // 6 sliders aligned under their jacks
  'slider-envelope-b-rise':      { x: 750, y: 450 },
  'slider-envelope-b-fall':      { x: 785, y: 450 },
  'slider-envelope-b-shape':     { x: 820, y: 450 },
  'slider-envelope-b-rise-mod':  { x: 855, y: 450 },
  'slider-envelope-b-fall-mod':  { x: 895, y: 450 },
  'slider-envelope-b-shape-mod': { x: 930, y: 450 },
  // Mode + Type switches far right, stacked
  'switch-envelope-b-mode-select':{ x: 960, y: 470 },
  'switch-envelope-b-type-select':{ x: 960, y: 515 },
};

// ===== Jack positions lookup (for cable rendering) =====

const JACK_POSITIONS: Record<string, { x: number; y: number }> = {};
for (const [id, meta] of Object.entries(CONTROL_METADATA)) {
  if (meta.type === 'jack-in' || meta.type === 'jack-out') {
    const pos = CONTROL_POSITIONS[id];
    if (pos) JACK_POSITIONS[id] = pos;
  }
}

// ===== Styles =====

const styles = {
  panelBg: { fill: '#111' } as React.CSSProperties,
  panelBorder: {
    fill: 'none',
    stroke: '#333',
    strokeWidth: 1,
  } as React.CSSProperties,
  sectionLabel: {
    fill: '#999',
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontSize: '7px',
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    letterSpacing: '1px',
    textAnchor: 'middle' as const,
  } as React.CSSProperties,
  knobBody: {
    fill: '#1a1a1a',
    stroke: '#555',
    strokeWidth: 1.2,
  } as React.CSSProperties,
  knobIndicator: {
    fill: 'none',
    stroke: '#ddd',
    strokeWidth: 1.5,
    strokeLinecap: 'round' as const,
  } as React.CSSProperties,
  knobLabel: {
    fill: '#aaa',
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontSize: '5.5px',
    textAnchor: 'middle' as const,
  } as React.CSSProperties,
  switchRect: {
    fill: '#222',
    stroke: '#555',
    strokeWidth: 0.8,
    rx: 1.5,
  } as React.CSSProperties,
  switchLabel: {
    fill: '#999',
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontSize: '5px',
    textAnchor: 'middle' as const,
  } as React.CSSProperties,
  ledOff: {
    fill: '#222',
    stroke: '#444',
    strokeWidth: 0.5,
  } as React.CSSProperties,
  jackLabel: {
    fill: '#aaa',
    fontFamily: "'Helvetica Neue', Arial, sans-serif",
    fontSize: '4.5px',
    textAnchor: 'middle' as const,
  } as React.CSSProperties,
  divider: {
    stroke: '#333',
    strokeWidth: 0.5,
    strokeDasharray: '2,2',
  } as React.CSSProperties,
} as const;

// ===== useKnobDrag Hook =====

function useKnobDrag(
  controlId: string,
  currentValue: number,
  onChange?: (controlId: string, value: number) => void,
) {
  const [isDragging, setIsDragging] = useState(false);
  const startY = useRef(0);
  const startValue = useRef(0);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (!onChange) return;
      e.preventDefault();
      const el = e.target as Element;
      if (el.setPointerCapture) {
        el.setPointerCapture(e.pointerId);
      }
      startY.current = e.clientY;
      startValue.current = currentValue;
      setIsDragging(true);
    },
    [currentValue, onChange],
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging || !onChange) return;
      const delta = startY.current - e.clientY;
      const newValue = Math.max(
        0,
        Math.min(127, startValue.current + Math.round(delta / 3)),
      );
      if (newValue !== currentValue) {
        onChange(controlId, newValue);
      }
    },
    [isDragging, controlId, currentValue, onChange],
  );

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    const el = e.target as Element;
    if (el.releasePointerCapture) {
      el.releasePointerCapture(e.pointerId);
    }
    setIsDragging(false);
  }, []);

  return { isDragging, onPointerDown, onPointerMove, onPointerUp };
}

// ===== useSliderDrag Hook =====

function useSliderDrag(
  controlId: string,
  currentValue: number,
  onChange?: (controlId: string, value: number) => void,
) {
  const [isDragging, setIsDragging] = useState(false);
  const startY = useRef(0);
  const startValue = useRef(0);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (!onChange) return;
      e.preventDefault();
      const el = e.target as Element;
      if (el.setPointerCapture) {
        el.setPointerCapture(e.pointerId);
      }
      startY.current = e.clientY;
      startValue.current = currentValue;
      setIsDragging(true);
    },
    [currentValue, onChange],
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging || !onChange) return;
      const delta = startY.current - e.clientY;
      const newValue = Math.max(
        0,
        Math.min(127, startValue.current + Math.round(delta / 3)),
      );
      if (newValue !== currentValue) {
        onChange(controlId, newValue);
      }
    },
    [isDragging, controlId, currentValue, onChange],
  );

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    const el = e.target as Element;
    if (el.releasePointerCapture) {
      el.releasePointerCapture(e.pointerId);
    }
    setIsDragging(false);
  }, []);

  return { isDragging, onPointerDown, onPointerMove, onPointerUp };
}

// ===== computeZoomViewBox =====

function computeZoomViewBox(sections: string[]): string | null {
  const padding = 20;
  let minX = Infinity,
    minY = Infinity,
    maxX = -Infinity,
    maxY = -Infinity;
  for (const name of sections) {
    const b = SECTION_BOUNDS[name];
    if (!b) continue;
    minX = Math.min(minX, b.x);
    minY = Math.min(minY, b.y);
    maxX = Math.max(maxX, b.x + b.width);
    maxY = Math.max(maxY, b.y + b.height);
  }
  if (minX === Infinity) return null;
  return `${minX - padding} ${minY - padding} ${maxX - minX + padding * 2} ${maxY - minY + padding * 2}`;
}

// ===== CablePath Component =====

interface CablePathProps {
  sourceId: string;
  destId: string;
  signalType: 'audio' | 'cv' | 'modulation' | 'default';
  purpose?: string;
}

function CablePath({ sourceId, destId, signalType, purpose }: CablePathProps) {
  const src = JACK_POSITIONS[sourceId];
  const dst = JACK_POSITIONS[destId];
  if (!src || !dst) return null;

  const dx = Math.abs(dst.x - src.x);
  const midX = (src.x + dst.x) / 2;
  const droop = Math.min(80, 30 + dx * 0.15);
  const midY = Math.max(src.y, dst.y) + droop;

  const color = CABLE_COLORS[signalType] || CABLE_COLORS.default;

  return (
    <path
      d={`M ${src.x},${src.y} Q ${midX},${midY} ${dst.x},${dst.y}`}
      fill="none"
      stroke={color}
      strokeWidth={3}
      strokeOpacity={0.8}
      strokeLinecap="round"
      style={{ pointerEvents: 'stroke' }}
    >
      {purpose && (
        <title>{`${sourceId} -> ${destId}: ${purpose}`}</title>
      )}
    </path>
  );
}

// ===== KnobGroup Component (memo'd) =====

interface KnobProps {
  id: string;
  x: number;
  y: number;
  label: string;
  rotation: number;
  highlighted?: boolean;
  highlightColor?: 'blue' | 'amber';
  dragHandlers: ReturnType<typeof useKnobDrag>;
}

function KnobGroupInner({
  id,
  x,
  y,
  label,
  rotation,
  highlighted,
  highlightColor,
  dragHandlers,
}: KnobProps) {
  const r = 12;

  return (
    <g
      id={id}
      transform={`translate(${x}, ${y})`}
      onPointerDown={dragHandlers.onPointerDown}
      onPointerMove={dragHandlers.onPointerMove}
      onPointerUp={dragHandlers.onPointerUp}
      style={{ cursor: dragHandlers.isDragging ? 'grabbing' : 'grab' }}
    >
      {highlighted && (
        <circle
          r={r + 4}
          fill="none"
          stroke={highlightColor === 'amber' ? '#ffaa33' : '#3388ff'}
          strokeOpacity={0.6}
          filter={`url(#glow-${highlightColor || 'blue'})`}
        />
      )}
      {dragHandlers.isDragging && (
        <circle r={r + 4} fill="var(--color-accent)" fillOpacity={0.4} />
      )}
      <circle r={r} style={styles.knobBody} />
      <line
        x1={0}
        y1={-3}
        x2={0}
        y2={-10}
        style={styles.knobIndicator}
        transform={`rotate(${rotation})`}
      />
      <text y={20} style={styles.knobLabel}>
        {label}
      </text>
    </g>
  );
}

const KnobGroup = memo(KnobGroupInner);

// ===== Interactive Knob Wrapper =====

function InteractiveKnob({
  id,
  x,
  y,
  label,
  value,
  highlighted,
  highlightColor,
  onChange,
}: {
  id: string;
  x: number;
  y: number;
  label: string;
  value: number;
  highlighted?: boolean;
  highlightColor?: 'blue' | 'amber';
  onChange?: (controlId: string, value: number) => void;
}) {
  const dragHandlers = useKnobDrag(id, value, onChange);
  const rotation = midiToRotation(value);

  return (
    <KnobGroup
      id={id}
      x={x}
      y={y}
      label={label}
      rotation={rotation}
      highlighted={highlighted}
      highlightColor={highlightColor}
      dragHandlers={dragHandlers}
    />
  );
}

// ===== Selector Knob config =====
// Rotary selectors with click positions labeled around the knob
const SELECTOR_KNOBS: Record<string, string[]> = {
  'knob-vcf-mode': ['LP1', 'LP2', 'LP4', 'BP2', 'BP4', 'HP4', 'NT2', 'PHZ'],
  'knob-vco-b-octave': ['0', '1', '2', '3', '4', '5', '6', '7'],
  'knob-vco-a-octave': ['0', '1', '2', '3', '4', '5', '6', '7'],
};

// ===== SelectorKnob Component =====

function SelectorKnobComponent({
  id,
  x,
  y,
  label,
  positions,
  highlighted,
  highlightColor,
}: {
  id: string;
  x: number;
  y: number;
  label: string;
  positions: string[];
  highlighted?: boolean;
  highlightColor?: 'blue' | 'amber';
}) {
  const r = 14;
  const labelRadius = r + 12;
  const count = positions.length;

  return (
    <g id={id} transform={`translate(${x}, ${y})`} style={{ cursor: 'default' }}>
      {highlighted && (
        <circle
          r={r + 6}
          fill="none"
          stroke={highlightColor === 'amber' ? '#ffaa33' : '#3388ff'}
          strokeOpacity={0.6}
          filter={`url(#glow-${highlightColor || 'blue'})`}
        />
      )}
      {/* Outer ring */}
      <circle r={r} fill="#1a1a1a" stroke="#666" strokeWidth={1.5} />
      {/* Inner dot */}
      <circle r={2} fill="#888" />
      {/* Position labels around the knob */}
      {positions.map((pos, i) => {
        // Spread positions from -135deg to +135deg (same range as knob)
        const angle = -135 + (270 / (count - 1)) * i;
        const rad = (angle - 90) * (Math.PI / 180);
        const lx = Math.cos(rad) * labelRadius;
        const ly = Math.sin(rad) * labelRadius;
        return (
          <text
            key={pos}
            x={lx}
            y={ly + 2}
            style={{
              fill: '#777',
              fontFamily: "'Helvetica Neue', Arial, sans-serif",
              fontSize: '3.5px',
              textAnchor: 'middle',
            }}
          >
            {pos}
          </text>
        );
      })}
      {/* Indicator line pointing to first position */}
      <line
        x1={0} y1={-3} x2={0} y2={-r + 2}
        stroke="#ddd" strokeWidth={1.5} strokeLinecap="round"
        transform="rotate(-135)"
      />
      <text y={r + 18} style={styles.knobLabel}>{label}</text>
    </g>
  );
}

// ===== SliderGroup Component (memo'd) =====

interface SliderProps {
  id: string;
  x: number;
  y: number;
  label: string;
  value: number;
  highlighted?: boolean;
  highlightColor?: 'blue' | 'amber';
  dragHandlers: ReturnType<typeof useSliderDrag>;
}

function SliderGroupInner({
  id,
  x,
  y,
  label,
  value,
  highlighted,
  highlightColor,
  dragHandlers,
}: SliderProps) {
  const trackWidth = 8;
  const trackHeight = 90;
  const thumbHeight = 12;
  const thumbWidth = 16;
  const pos = midiToSliderPosition(value);
  const thumbY = y + trackHeight - pos * trackHeight - thumbHeight / 2;

  return (
    <g
      id={id}
      onPointerDown={dragHandlers.onPointerDown}
      onPointerMove={dragHandlers.onPointerMove}
      onPointerUp={dragHandlers.onPointerUp}
      style={{ cursor: dragHandlers.isDragging ? 'grabbing' : 'grab' }}
    >
      {highlighted && (
        <rect
          x={x - thumbWidth / 2 - 2}
          y={y - 2}
          width={thumbWidth + 4}
          height={trackHeight + 4}
          fill="none"
          stroke={highlightColor === 'amber' ? '#ffaa33' : '#3388ff'}
          strokeOpacity={0.6}
          filter={`url(#glow-${highlightColor || 'blue'})`}
        />
      )}
      {/* Track */}
      <rect
        x={x - trackWidth / 2}
        y={y}
        width={trackWidth}
        height={trackHeight}
        fill="#111"
        stroke="#444"
        strokeWidth={0.8}
        rx={2}
      />
      {/* Thumb */}
      <rect
        x={x - thumbWidth / 2}
        y={thumbY}
        width={thumbWidth}
        height={thumbHeight}
        fill="#2a2a2a"
        stroke="#666"
        strokeWidth={1}
        rx={1.5}
      />
      <text
        x={x}
        y={y + trackHeight + 12}
        style={styles.knobLabel}
      >
        {label}
      </text>
    </g>
  );
}

const SliderGroup = memo(SliderGroupInner);

// ===== Interactive Slider Wrapper =====

function InteractiveSlider({
  id,
  x,
  y,
  label,
  value,
  highlighted,
  highlightColor,
  onChange,
}: {
  id: string;
  x: number;
  y: number;
  label: string;
  value: number;
  highlighted?: boolean;
  highlightColor?: 'blue' | 'amber';
  onChange?: (controlId: string, value: number) => void;
}) {
  const dragHandlers = useSliderDrag(id, value, onChange);

  return (
    <SliderGroup
      id={id}
      x={x}
      y={y}
      label={label}
      value={value}
      highlighted={highlighted}
      highlightColor={highlightColor}
      dragHandlers={dragHandlers}
    />
  );
}

// ===== Switch type lookup =====
// 2-way switches (on/off toggles)
const TWO_WAY_SWITCHES = new Set([
  'switch-mixer-soft-clip',
  'switch-vco-a-tzfm',
  'switch-vco-a-ac-dc',
  'switch-vco-b-vco-lfo',
  'switch-utilities-env-follow',
  'switch-utilities-x2',
  'switch-utilities-polarity',
  'switch-output-control-soft-clip',
  'switch-push-gate-manual',
  'switch-vco-b-pitch-source',
  'switch-utilities-slew-shape',
  'switch-lfo-xyz-y-divider',
  'switch-lfo-xyz-z-divider',
]);

// ===== SwitchGroup Component =====

function SwitchGroupComponent({
  id,
  x,
  y,
  label,
  highlighted,
  highlightColor,
}: {
  id: string;
  x: number;
  y: number;
  label: string;
  highlighted?: boolean;
  highlightColor?: 'blue' | 'amber';
}) {
  const isTwoWay = TWO_WAY_SWITCHES.has(id);
  const r = 4;
  const gap = 10;

  return (
    <g id={id} transform={`translate(${x}, ${y})`} style={{ cursor: 'default' }}>
      {highlighted && (
        <rect
          x={-10}
          y={isTwoWay ? -8 : -14}
          width={20}
          height={isTwoWay ? 36 : 46}
          fill="none"
          stroke={highlightColor === 'amber' ? '#ffaa33' : '#3388ff'}
          strokeOpacity={0.6}
          rx={3}
          filter={`url(#glow-${highlightColor || 'blue'})`}
        />
      )}
      {isTwoWay ? (
        <>
          {/* 2-way: filled top circle, open bottom circle */}
          <circle cy={-gap / 2} r={r} fill="#cc4422" stroke="#888" strokeWidth={0.8} />
          <circle cy={gap / 2} r={r} fill="#222" stroke="#888" strokeWidth={0.8} />
        </>
      ) : (
        <>
          {/* 3-way: top filled, middle open, bottom open (traffic light) */}
          <circle cy={-gap} r={r} fill="#cc4422" stroke="#888" strokeWidth={0.8} />
          <circle cy={0} r={r} fill="#222" stroke="#888" strokeWidth={0.8} />
          <circle cy={gap} r={r} fill="#222" stroke="#888" strokeWidth={0.8} />
        </>
      )}
      <text y={isTwoWay ? -16 : -20} style={styles.switchLabel}>
        {label}
      </text>
    </g>
  );
}

// ===== JackGroup Component =====

function JackGroupComponent({
  id,
  x,
  y,
  label,
  isOutput,
  highlighted,
  highlightColor,
}: {
  id: string;
  x: number;
  y: number;
  label: string;
  isOutput: boolean;
  highlighted?: boolean;
  highlightColor?: 'blue' | 'amber';
}) {
  return (
    <g id={id} transform={`translate(${x}, ${y})`}>
      {highlighted && (
        <circle
          r={10}
          fill="none"
          stroke={highlightColor === 'amber' ? '#ffaa33' : '#3388ff'}
          strokeOpacity={0.6}
          filter={`url(#glow-${highlightColor || 'blue'})`}
        />
      )}
      <circle
        r={6}
        fill={isOutput ? '#e8e8e8' : '#1a1a1a'}
        stroke={isOutput ? '#fff' : '#555'}
        strokeWidth={isOutput ? 1.5 : 1}
      />
      <text y={12} style={styles.jackLabel}>
        {label}
      </text>
    </g>
  );
}

// ===== LED Component =====

function LEDComponent({
  id,
  x,
  y,
  highlighted,
  highlightColor,
}: {
  id: string;
  x: number;
  y: number;
  highlighted?: boolean;
  highlightColor?: 'blue' | 'amber';
}) {
  return (
    <g id={id} transform={`translate(${x}, ${y})`}>
      {highlighted && (
        <circle
          r={6}
          fill="none"
          stroke={highlightColor === 'amber' ? '#ffaa33' : '#3388ff'}
          strokeOpacity={0.6}
          filter={`url(#glow-${highlightColor || 'blue'})`}
        />
      )}
      <circle r={3} style={styles.ledOff} />
    </g>
  );
}

// ===== Main CascadiaPanel Component =====

function CascadiaPanelInner({
  knobValues,
  highlights,
  activeSections,
  zoomSections,
  cables,
  onKnobChange,
  className,
}: CascadiaPanelProps) {
  const [internalValues, setInternalValues] = useState<
    Record<string, number>
  >({});
  const [hoveredControl, setHoveredControl] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const effectiveValues = knobValues ?? internalValues;
  const effectiveOnChange =
    onKnobChange ??
    ((id: string, val: number) => {
      setInternalValues((prev) => ({ ...prev, [id]: val }));
    });

  const getVal = (id: string) => effectiveValues[id] ?? 64;
  const isHighlighted = (id: string) =>
    highlights?.some((h) => h.controlId === id) ?? false;
  const getHighlightColor = (id: string) =>
    highlights?.find((h) => h.controlId === id)?.color;

  const viewBox =
    (zoomSections?.length ? computeZoomViewBox(zoomSections) : null) ??
    '0 0 1000 580';

  // Event delegation for hover
  const findControlId = useCallback(
    (target: EventTarget | null): string | null => {
      let el = target as Element | null;
      while (el && el !== svgRef.current) {
        const id = el.getAttribute('id');
        if (id && CONTROL_METADATA[id]) return id;
        el = el.parentElement;
      }
      return null;
    },
    [],
  );

  const onMouseOver = useCallback(
    (e: React.MouseEvent) => {
      const id = findControlId(e.target);
      setHoveredControl(id);
    },
    [findControlId],
  );

  const onMouseLeave = useCallback(
    (e: React.MouseEvent) => {
      const related = findControlId(e.relatedTarget);
      if (!related) setHoveredControl(null);
    },
    [findControlId],
  );

  return (
    <div className={clsx('relative', className)}>
      <motion.svg
        ref={svgRef}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1000 580"
        whileInView={{ viewBox: viewBox }}
        viewport={{ once: true }}
        transition={{ type: 'tween', duration: 0.3, ease: 'easeInOut' }}
        width="100%"
        onMouseOver={onMouseOver}
        onMouseLeave={onMouseLeave}
      >
        <defs>
          {/* Glow filters for highlights */}
          <filter id="glow-blue" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="3"
              result="blur"
            />
            <feFlood floodColor="#3388ff" floodOpacity="0.6" result="color" />
            <feComposite
              in="color"
              in2="blur"
              operator="in"
              result="glow"
            />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter
            id="glow-amber"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="3"
              result="blur"
            />
            <feFlood floodColor="#ffaa33" floodOpacity="0.6" result="color" />
            <feComposite
              in="color"
              in2="blur"
              operator="in"
              result="glow"
            />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Panel background */}
        <rect style={styles.panelBg} x="0" y="0" width="1000" height="750" />
        <rect
          style={styles.panelBorder}
          x="0"
          y="0"
          width="1000"
          height="750"
        />

        {/* Row separator bars */}
        <rect fill="#1a1a1a" stroke="#333" strokeWidth={0.5} x="0" y="58" width="1000" height="14" />
        <rect fill="#1a1a1a" stroke="#333" strokeWidth={0.5} x="0" y="230" width="1000" height="14" />
        <rect fill="#1a1a1a" stroke="#333" strokeWidth={0.5} x="155" y="385" width="845" height="14" />
        {/* Left column divider between S&H and VCO B */}
        <rect fill="#1a1a1a" stroke="#333" strokeWidth={0.5} x="0" y="330" width="155" height="12" />

        {/* Section tint rectangles */}
        {activeSections?.map((section) => {
          const bounds = SECTION_BOUNDS[section];
          if (!bounds) return null;
          return (
            <rect
              key={section}
              x={bounds.x}
              y={bounds.y}
              width={bounds.width}
              height={bounds.height}
              rx={4}
              fill="rgba(255,255,255,0.03)"
              fillOpacity={0.08}
              style={{ transition: 'opacity 150ms ease-out' }}
            />
          );
        })}

        {/* Section dividers and labels */}
        {MODULE_ORDER.map((moduleName) => {
          const bounds = SECTION_BOUNDS[moduleName];
          if (!bounds) return null;
          const displayName = MODULE_DISPLAY_NAMES[moduleName] ?? moduleName;
          return (
            <React.Fragment key={`section-${moduleName}`}>
              {/* Divider line on the right edge */}
              <line
                style={styles.divider}
                x1={bounds.x + bounds.width}
                y1={bounds.y}
                x2={bounds.x + bounds.width}
                y2={bounds.y + bounds.height}
              />
              {/* Section label — positioned in the separator bar above the row */}
              <text
                style={styles.sectionLabel}
                x={bounds.x + bounds.width / 2}
                y={bounds.y < 60 ? bounds.y + 14 : bounds.y - 3}
              >
                {displayName}
              </text>
            </React.Fragment>
          );
        })}

        {/* Utilities sub-section labels and dividers */}
        <text style={styles.sectionLabel} x={75} y={241}>S&H</text>
        <text style={styles.sectionLabel} x={220} y={241}>SLEW / ENV FOLLOW</text>
        <text style={styles.sectionLabel} x={355} y={241}>MIXUVERTER</text>
        <line style={styles.divider} x1={155} y1={244} x2={155} y2={410} />
        <line style={styles.divider} x1={295} y1={244} x2={295} y2={410} />

        {/* Patchbay sub-section labels */}
        <text style={styles.sectionLabel} x={625} y={255}>MULTS</text>
        <text style={styles.sectionLabel} x={690} y={255}>SUM</text>
        <text style={styles.sectionLabel} x={720} y={255}>INV</text>
        <text style={styles.sectionLabel} x={755} y={255}>BI►UNI</text>
        <text style={styles.sectionLabel} x={795} y={255}>EXPR</text>
        <text style={styles.sectionLabel} x={853} y={255}>RING MOD</text>
        {/* Divider between Ring Mod and VCA B/LPF */}
        <line style={styles.divider} x1={895} y1={244} x2={895} y2={410} />

        {/* Render all controls by module */}
        {MODULE_ORDER.map((moduleName) => {
          const controls = Object.values(CONTROL_METADATA).filter(
            (c) => c.module === moduleName,
          );

          return (
            <g key={`module-${moduleName}`}>
              {controls.map((ctrl) => {
                const pos = CONTROL_POSITIONS[ctrl.id];
                if (!pos) return null;

                const highlighted = isHighlighted(ctrl.id);
                const highlightColor = getHighlightColor(ctrl.id);

                switch (ctrl.type) {
                  case 'knob':
                    if (SELECTOR_KNOBS[ctrl.id]) {
                      return (
                        <SelectorKnobComponent
                          key={ctrl.id}
                          id={ctrl.id}
                          x={pos.x}
                          y={pos.y}
                          label={ctrl.name}
                          positions={SELECTOR_KNOBS[ctrl.id]}
                          highlighted={highlighted}
                          highlightColor={highlightColor}
                        />
                      );
                    }
                    return (
                      <InteractiveKnob
                        key={ctrl.id}
                        id={ctrl.id}
                        x={pos.x}
                        y={pos.y}
                        label={ctrl.name}
                        value={getVal(ctrl.id)}
                        highlighted={highlighted}
                        highlightColor={highlightColor}
                        onChange={effectiveOnChange}
                      />
                    );
                  case 'slider':
                    return (
                      <InteractiveSlider
                        key={ctrl.id}
                        id={ctrl.id}
                        x={pos.x}
                        y={pos.y}
                        label={ctrl.name}
                        value={getVal(ctrl.id)}
                        highlighted={highlighted}
                        highlightColor={highlightColor}
                        onChange={effectiveOnChange}
                      />
                    );
                  case 'switch':
                    return (
                      <SwitchGroupComponent
                        key={ctrl.id}
                        id={ctrl.id}
                        x={pos.x}
                        y={pos.y}
                        label={ctrl.name}
                        highlighted={highlighted}
                        highlightColor={highlightColor}
                      />
                    );
                  case 'jack-in':
                  case 'jack-out':
                    return (
                      <JackGroupComponent
                        key={ctrl.id}
                        id={ctrl.id}
                        x={pos.x}
                        y={pos.y}
                        label={ctrl.name}
                        isOutput={ctrl.type === 'jack-out'}
                        highlighted={highlighted}
                        highlightColor={highlightColor}
                      />
                    );
                  case 'led':
                    return (
                      <LEDComponent
                        key={ctrl.id}
                        id={ctrl.id}
                        x={pos.x}
                        y={pos.y}
                        highlighted={highlighted}
                        highlightColor={highlightColor}
                      />
                    );
                  default:
                    return null;
                }
              })}
            </g>
          );
        })}

        {/* Cable paths - rendered LAST for highest z-order */}
        {cables?.map((cable, i) => (
          <CablePath
            key={`cable-${i}`}
            sourceId={cable.sourceId}
            destId={cable.destId}
            signalType={cable.signalType}
            purpose={cable.purpose}
          />
        ))}
      </motion.svg>

      {/* Tooltip */}
      <PanelTooltip
        controlId={hoveredControl}
        svgRef={svgRef}
        knobValues={effectiveValues}
      />
    </div>
  );
}

const CascadiaPanel = memo(CascadiaPanelInner);

export { CascadiaPanel };
