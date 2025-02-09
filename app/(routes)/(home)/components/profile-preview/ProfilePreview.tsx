import { PhonePreview } from "./phone-preview";

export const ProfilePreview = () => {
  return (
    <div className="md:border-l border-neutral-300 p-6 flex flex-col items-center text-center">
      <h3 className="text-2xl font-semibold text-neutral-900">Preview of your profile</h3>
      <p className="text-sm text-neutral-600">This is how your profile will look.</p>

      <PhonePreview />
    </div>
  );
};
