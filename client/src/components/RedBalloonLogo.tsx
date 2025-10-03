import balloonLogo from "@assets/generated_images/Red_balloon_logo_illustration_c4a5ecfa.png";

interface RedBalloonLogoProps {
  size?: "sm" | "md" | "lg";
  animate?: boolean;
}

export default function RedBalloonLogo({ size = "md", animate = true }: RedBalloonLogoProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-20 h-20",
  };

  return (
    <div className={`${sizeClasses[size]} ${animate ? "animate-float" : ""}`}>
      <img 
        src={balloonLogo} 
        alt="Red Balloon Logo" 
        className="w-full h-full object-contain"
      />
    </div>
  );
}
