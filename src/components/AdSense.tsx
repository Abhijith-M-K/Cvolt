"use client";

import React, { useEffect, useState } from "react";

interface AdSenseProps {
  slot?: string;
  format?: "auto" | "fluid" | "horizontal" | "vertical" | "rectangle";
  responsive?: "true" | "false";
  style?: React.CSSProperties;
  layout?: "banner" | "sidebar" | "in-feed";
}

export default function AdSense({
  slot = "1234567890",
  format = "auto",
  responsive = "true",
  style,
}: AdSenseProps) {
  const [adClient, setAdClient] = useState<string | null>(null);

  useEffect(() => {
    // Check for client id
    const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
    if (client) {
      setAdClient(client);
    }
  }, []);

  useEffect(() => {
    if (adClient) {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        console.error("AdSense push error: ", err);
      }
    }
  }, [adClient]);

  // If AdSense client ID is defined, render the real AdSense ins element.
  // Otherwise, return null (fully hides all sponsored placeholder sections)
  if (!adClient) return null;

  return (
    <div className="adsense-wrapper" style={{ margin: "1.5rem 0", overflow: "hidden", ...style }}>
      <ins
        className="adsbygoogle"
        style={{ display: "block", minHeight: "90px", ...style }}
        data-ad-client={adClient}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive}
      />
    </div>
  );
}
