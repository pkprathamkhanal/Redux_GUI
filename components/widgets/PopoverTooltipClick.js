/**
 * PopoverTooltipHover.js
 * 
 * This is a resuable "widget" that acts as tooltip.
 * 
 * Requires the prop attributes "header","formalDef", and "info" which will become more generic in the future.
 * 
 * @author Alex Diviney
 */


import { OverlayTrigger, Tooltip, Popover, Button } from 'react-bootstrap';
import { SvgIcon } from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { useEffect,useContext } from 'react';
import { getThemeProps } from '@mui/system';

// This helper builds a valid Wikipedia or external link.
// If a full URL (http/https) is provided, it returns it as-is.
// Otherwise, it converts the given title (wikiOrUrl or fallbackTitle)
// into a Wikipedia link by replacing spaces with underscores.

function normalizeHref(wikiOrUrl, fallbackTitle) {
  if (wikiOrUrl && /^https?:\/\//i.test(wikiOrUrl)) return wikiOrUrl;
  const title = wikiOrUrl || fallbackTitle;
  if (!title) return null;
  return `https://en.wikipedia.org/wiki/${encodeURIComponent(String(title).replace(/\s+/g, "_"))}`;
}

function popOver(props) {
  const t = props?.toolTip || {};
  const href = normalizeHref(t.wiki, t.header);

  return (
    <Popover id="popover-basic" className="tooltip">
      <Popover.Body style={{ maxWidth: 480, lineHeight: 1.35 }}>
        {t.header ? (
          href ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                fontWeight: 700,
                textDecoration: "underline",
                color: "#0d6efd",
                marginBottom: 10
              }}
            >
              {t.header}
            </a>
          ) : (
            <div style={{ fontWeight: 700, marginBottom: 10 }}>{t.header}</div>
          )
        ) : null}

        {t.formalDef ? (
          <div
            style={{
              padding: "8px 10px",
              borderRadius: 6,
              background: "rgba(0,0,0,0.06)",
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
              whiteSpace: "pre-wrap",
              marginBottom: 12
            }}
          >
            {t.formalDef}
          </div>
        ) : null}

        {t.info ? (
          <div style={{ marginBottom: 12, whiteSpace: "pre-wrap" }}>
            {t.info}
          </div>
        ) : null}

        {t.source ? (
          <div style={{ marginBottom: 6 }}>
            <strong>Source:</strong> {t.source}
          </div>
        ) : null}

        {t.credit ? (
          <div>
            <strong>Contributed by:</strong> {t.credit}
          </div>
        ) : null}
      </Popover.Body>
    </Popover>
  );

}

function PopoverTooltipClick(props) {


  return (
    <OverlayTrigger rootClose={true} trigger="click" placement="bottom" overlay={popOver(props)} >
      <InfoOutlinedIcon>
        <Button variant="success">
        </Button>
      </InfoOutlinedIcon>
    </OverlayTrigger>
  )
}

export default PopoverTooltipClick;
