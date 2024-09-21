const settingKeys = ["minTime"];

export const settings = {
  minTime: 180,
};

export const fetchSettingsFromStorage = async () => {
  console.log("Fetching settings");
  const result = await chrome.storage.sync.get(settingKeys);
  console.log(result);
  Object.keys(result).forEach((key) => {
    settings[key] = result[key];
  });
  console.log("Settings loaded", settings);
};

export const getMinTime = () => {
  const minutes = Math.floor(settings.minTime / 60);
  const seconds = settings.minTime % 60;
  const time = { minutes, seconds };
  console.log("Time", time);
  return time;
};

export const setMinTime = async (minTime) => {
  await chrome.storage.sync.set({ "minTime": minTime }, function () {
    console.log(`minTime is set to ${minTime}`);
  });
  settings.minTime = minTime;
  console.log("Settings", settings);
};