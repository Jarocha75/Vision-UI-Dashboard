const SmileIcon = () => (
  <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
    <circle cx="15" cy="15" r="15" fill="url(#iconGradient)" />
    <path
      d="M10 18C11 20 13 21 15 21C17 21 19 20 20 18"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <circle cx="11" cy="13" r="2" fill="white" />
    <circle cx="19" cy="13" r="2" fill="white" />
    <defs>
      <linearGradient id="iconGradient" x1="0" y1="0" x2="30" y2="30">
        <stop offset="0%" stopColor="#3A7BFF" />
        <stop offset="100%" stopColor="#00E1FF" />
      </linearGradient>
    </defs>
  </svg>
);
export default SmileIcon;
