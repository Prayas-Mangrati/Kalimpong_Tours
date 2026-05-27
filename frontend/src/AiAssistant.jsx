import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function AiAssistant() {
  
  return (
    <div className="w-40 fixed bottom-6 right-6 z-50">
      <DotLottieReact
        src="/assets/robot.lottie"
        loop
        autoplay
      />
    </div>
  );
}