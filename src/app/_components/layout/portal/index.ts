"use client";

import React, { ReactElement, useEffect, useState } from "react";
import { createPortal } from "react-dom";

export function Portal({
  children,
  type = "modal",
}: {
  children: ReactElement;
  type?: "modal" | "toast";
}) {
  const [mounted, setMounted] = useState<boolean>(false);
  const [portalElement, setPortalElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setMounted(true);
    setPortalElement(document.getElementById(`${type}-portal`));

    return () => setMounted(false);
  }, [type]);

  if (!mounted || !portalElement) {
    return null;
  }

  return createPortal(children, portalElement);
}
