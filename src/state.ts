import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const currentTeamState = atom<1 | 2>({
  key: "currentTeam",
  default: 1,
  effects_UNSTABLE: [persistAtom],
});
export const totalOversState = atom<number>({
  key: "totalOvers",
  default: 20,
  effects_UNSTABLE: [persistAtom],
});

export const team1RunsState = atom<number>({
  key: "team1Runs",
  default: 0,
  effects_UNSTABLE: [persistAtom],
});
export const team1WicketsState = atom<number>({
  key: "team1Wickets",
  default: 0,
  effects_UNSTABLE: [persistAtom],
});
export const team1OversState = atom<number>({
  key: "team1Overs",
  default: 0,
  effects_UNSTABLE: [persistAtom],
});
export const team1NameState = atom<string>({
  key: "team1Name",
  default: "Team 1",
  effects_UNSTABLE: [persistAtom],
});

export const team2RunsState = atom<number>({
  key: "team2Runs",
  default: 0,
  effects_UNSTABLE: [persistAtom],
});
export const team2WicketsState = atom<number>({
  key: "team2Wickets",
  default: 0,
  effects_UNSTABLE: [persistAtom],
});
export const team2OversState = atom<number>({
  key: "team2Overs",
  default: 0,
  effects_UNSTABLE: [persistAtom],
});
export const team2NameState = atom<string>({
  key: "team2Name",
  default: "Team 2",
  effects_UNSTABLE: [persistAtom],
});
