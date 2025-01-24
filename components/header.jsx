export default function Header() {
  return (
    <header
      style={{
        width: "100%",
        height: "69px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 24px",
        borderBottom: "1px solid #E5E5E5",
        backgroundColor: "white",
      }}
    >
      <img
        src="/logo.svg"
        alt="WOORI Design"
        style={{
          height: "18px",
        }}
      />

      <img
        src="/member.svg"
        alt="Team Members"
        style={{
          height: "12px",
        }}
      />
    </header>
  );
}
