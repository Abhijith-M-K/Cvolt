"use client";

import React, { useEffect, useState, useRef } from "react";

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
  const [adStatus, setAdStatus] = useState<"loading" | "filled" | "unfilled" | "blocked">("loading");
  const insRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    // Disable ads in local development hostnames to prevent empty placeholder boxes
    if (typeof window !== "undefined") {
      const hostname = window.location.hostname;
      if (
        hostname === "localhost" ||
        hostname === "127.0.0.1" ||
        hostname.startsWith("192.168.") ||
        hostname.startsWith("10.") ||
        hostname.endsWith(".local")
      ) {
        setAdStatus("blocked");
        return;
      }
    }

    const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
    if (client) {
      setAdClient(client);
    }
  }, []);

  useEffect(() => {
    if (!adClient) return;

    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error("AdSense push error: ", err);
    }
  }, [adClient]);

  useEffect(() => {
    if (!adClient || !insRef.current) return;

    const insEl = insRef.current;
    
    // Check initial state
    const status = insEl.getAttribute("data-ad-status");
    if (status === "filled") {
      setAdStatus("filled");
    } else if (status === "unfilled") {
      setAdStatus("unfilled");
    }

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "attributes" && mutation.attributeName === "data-ad-status") {
          const newStatus = insEl.getAttribute("data-ad-status");
          if (newStatus === "filled") {
            setAdStatus("filled");
          } else if (newStatus === "unfilled") {
            setAdStatus("unfilled");
          }
        }
        // Also check if iframe is added
        if (mutation.type === "childList") {
          const hasIframe = insEl.getElementsByTagName("iframe").length > 0;
          if (hasIframe) {
            setAdStatus("filled");
          }
        }
      });
    });

    observer.observe(insEl, {
      attributes: true,
      attributeFilter: ["data-ad-status"],
      childList: true,
    });

    // Fallback: if after 2.5 seconds it is still "loading", check if it is empty or blocked
    const timer = setTimeout(() => {
      const currentStatus = insEl.getAttribute("data-ad-status");
      const hasIframe = insEl.getElementsByTagName("iframe").length > 0;
      if (currentStatus === "filled" || hasIframe) {
        setAdStatus("filled");
      } else if (currentStatus === "unfilled") {
        setAdStatus("unfilled");
      } else {
        // If it's still empty and no status is set, it might be blocked by adblocker
        setAdStatus("blocked");
      }
    }, 2500);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [adClient]);

  if (!adClient || adStatus === "unfilled" || adStatus === "blocked") {
    return null;
  }

  const isFilled = adStatus === "filled";

  // Hide the wrapper and layout settings if not loaded yet to prevent layout shift
  const wrapperStyle: React.CSSProperties = {
    margin: "1.5rem 0",
    overflow: "hidden",
    transition: "all 0.3s ease-out",
    ...style,
    ...(!isFilled ? {
      maxHeight: "0px",
      margin: "0px",
      padding: "0px",
      opacity: 0,
      background: "transparent",
      border: "none",
      boxShadow: "none"
    } : {})
  };

  return (
    <div className="adsense-wrapper" style={wrapperStyle}>
      <ins
        ref={insRef}
        className="adsbygoogle"
        style={{ 
          display: "block", 
          minHeight: isFilled ? "90px" : "0px",
          width: "100%"
        }}
        data-ad-client={adClient}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive}
      />
    </div>
  );
}
