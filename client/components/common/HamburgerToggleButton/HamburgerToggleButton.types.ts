export interface HamburgerToggleButtonProps {
  isOpen: boolean;
  onToggle: () => void;
  gapBetweenLines?: number;
  lineWidth?: number;
  "aria-expanded"?: boolean;
  "aria-controls"?: string;
}
