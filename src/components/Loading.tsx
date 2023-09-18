import { SpinnerCircular } from 'spinners-react';

function Loading() {
  return (
    <div className="flex h-full items-center justify-center">
      <SpinnerCircular size={75} thickness={150} secondaryColor="rgba(0, 0, 0, .2)" color="#fff" />
    </div>
  );
}

export default Loading;
