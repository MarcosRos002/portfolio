// Footer.tsx — contact + links (stub).
// TODO (Phase 1): CV downloads (ES/EN), styled layout.
export function Footer() {
  return (
    <footer style={{ padding: "2rem", borderTop: "1px solid #333" }}>
      <p>
        <a href="https://github.com/MarcosRos002">GitHub</a>
        {" · "}
        <a href="https://linkedin.com/in/marcosrostan">LinkedIn</a>
        {" · "}
        <a href="mailto:rostanmarcos@gmail.com">rostanmarcos@gmail.com</a>
      </p>
      <p>© {new Date().getFullYear()} Marcos Rostan</p>
    </footer>
  );
}
