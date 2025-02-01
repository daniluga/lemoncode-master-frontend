import config from "./env-config";

export const HelloComponent = () => {
  return (
    <>
      <h4>Hello component</h4>
      <p>Api server is {config.API_BASE}</p>
      <p>Feature A is {config.IS_FEATURE_A_ENABLED ? "enabled" : "disabled"}</p>
    </>
  );
};
