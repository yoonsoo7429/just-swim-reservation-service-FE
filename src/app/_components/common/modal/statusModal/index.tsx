"use client";

import { StatusModalProps } from "@types";
import { useEffect } from "react";
import styled from "./styles.module.scss";

export function StatusModal({
  statusMessage,
  isVisible,
  onClose,
  duration = 2000,
}: StatusModalProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  return (
    <div className={styled.modalBackground}>
      <div className={styled.modalContainer}>
        <p>{statusMessage}</p>
      </div>
    </div>
  );
}
