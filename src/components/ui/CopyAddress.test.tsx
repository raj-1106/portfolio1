import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CopyAddress } from './CopyAddress';
import React from 'react';

describe('CopyAddress', () => {
  it('copies the full address and shows confirmation (main case)', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.assign(navigator, { clipboard: { writeText } });
    render(<CopyAddress address="0xA1755560e8CAec3d69446F57B6D97B5aF6f2BD63" />);
    fireEvent.click(screen.getByRole('button'));
    await waitFor(() => expect(writeText).toHaveBeenCalledWith('0xA1755560e8CAec3d69446F57B6D97B5aF6f2BD63'));
    expect(await screen.findByText(/copied/i)).toBeTruthy();
  });

  it('truncates a short address without crashing (edge case)', () => {
    render(<CopyAddress address="0x1234567890" />);
    expect(screen.getByRole('button')).toBeTruthy();
  });

  it('shows a clear fallback message if clipboard write fails (failure case)', async () => {
    const writeText = vi.fn().mockRejectedValue(new Error('denied'));
    Object.assign(navigator, { clipboard: { writeText } });
    render(<CopyAddress address="0xA1755560e8CAec3d69446F57B6D97B5aF6f2BD63" />);
    fireEvent.click(screen.getByRole('button'));
    expect(await screen.findByText(/copy failed/i)).toBeTruthy();
  });
});
