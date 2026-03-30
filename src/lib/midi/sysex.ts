/**
 * SysEx message constants and builders for the DSI Evolver.
 * Source: DSI Evolver Keyboard Manual v1.3, pp.41-44
 */

/** DSI / Sequential manufacturer ID */
export const DSI_MANUFACTURER_ID = 0x01;

/** Evolver device ID */
export const EVOLVER_DEVICE_ID = 0x20;

/** Evolver file version */
export const EVOLVER_FILE_VERSION = 0x01;

/** SysEx command bytes */
export const SYSEX_CMD_PROGRAM_PARAM = 0x01;
export const SYSEX_CMD_PROGRAM_DUMP = 0x02;
export const SYSEX_CMD_EDIT_BUFFER_DUMP = 0x03;
export const SYSEX_CMD_REQUEST_PROGRAM = 0x05;
export const SYSEX_CMD_REQUEST_EDIT_BUFFER = 0x06;

/** Pre-built request message: Request Edit Buffer Dump */
export const SYSEX_REQUEST_EDIT_BUFFER = new Uint8Array([
  0xF0, 0x01, 0x20, 0x01, 0x06, 0xF7,
]);

/**
 * Wraps 220 packed bytes with the Edit Buffer Data Dump header and footer.
 * Format: F0 01 20 01 03 [220 packed bytes] F7
 */
export function buildEditBufferDump(packedData: Uint8Array): Uint8Array {
  if (packedData.length !== 220) {
    throw new Error(`Expected 220 packed bytes, got ${packedData.length}`);
  }
  const msg = new Uint8Array(226); // 5 header + 220 data + 1 footer
  msg[0] = 0xF0;
  msg[1] = DSI_MANUFACTURER_ID;
  msg[2] = EVOLVER_DEVICE_ID;
  msg[3] = EVOLVER_FILE_VERSION;
  msg[4] = SYSEX_CMD_EDIT_BUFFER_DUMP;
  msg.set(packedData, 5);
  msg[225] = 0xF7;
  return msg;
}

/**
 * Validates a SysEx message from the Evolver.
 * Checks: start byte 0xF0, manufacturer 0x01, device 0x20, end byte 0xF7.
 * Returns command byte and data payload length if valid.
 */
export function validateSysexMessage(
  data: Uint8Array
): { valid: boolean; command?: number; dataLength?: number } {
  if (data.length < 6) {
    return { valid: false };
  }
  if (data[0] !== 0xF0) {
    return { valid: false };
  }
  if (data[1] !== DSI_MANUFACTURER_ID) {
    return { valid: false };
  }
  if (data[2] !== EVOLVER_DEVICE_ID) {
    return { valid: false };
  }
  if (data[data.length - 1] !== 0xF7) {
    return { valid: false };
  }

  const command = data[4];
  // Data payload is everything between header (5 bytes) and footer (1 byte)
  const dataLength = data.length - 6;

  return { valid: true, command, dataLength };
}
