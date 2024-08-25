import { useRecoilState } from "recoil";
import {
  team1NameState,
  team1OversState,
  team1RunsState,
  team1WicketsState,
  team2NameState,
  team2OversState,
  team2RunsState,
  team2WicketsState,
  currentTeamState,
  totalOversState,
} from "./state";
import { useCallback, useEffect } from "react";
import ContentEditable from "react-contenteditable";

const undoTree: {
  actions: {
    key:
      | "team1Runs"
      | "team1Wickets"
      | "team1Overs"
      | "team2Runs"
      | "team2Wickets"
      | "team2Overs"
      | "team1Name"
      | "team2Name"
      | "totalOvers";
    value: any;
  }[];
}[] = [];

export const App = () => {
  console.log(undoTree);
  const [currentTeam, setCurrentTeam] = useRecoilState(currentTeamState);
  const [totalOvers, setTotalOvers] = useRecoilState(totalOversState);

  const [team1Runs, setTeam1Runs] = useRecoilState(team1RunsState);
  const [team1Wickets, setTeam1Wickets] = useRecoilState(team1WicketsState);
  const [team1Overs, setTeam1Overs] = useRecoilState(team1OversState);
  const [team1Name, setTeam1Name] = useRecoilState(team1NameState);

  const [team2Runs, setTeam2Runs] = useRecoilState(team2RunsState);
  const [team2Wickets, setTeam2Wickets] = useRecoilState(team2WicketsState);
  const [team2Overs, setTeam2Overs] = useRecoilState(team2OversState);
  const [team2Name, setTeam2Name] = useRecoilState(team2NameState);

  useEffect(() => {
    if (currentTeam === 1) {
      if ((totalOvers != 0 && team1Overs >= totalOvers) || team1Wickets >= 10) {
        setCurrentTeam(2);
      }
    } else {
      if (totalOvers != 0 && team1Overs < totalOvers && team1Wickets < 10) {
        setCurrentTeam(1);
      }
      if (totalOvers != 0 && team2Overs >= totalOvers) {
        setTeam2Overs(totalOvers);
      } else if (team2Wickets > 10) {
        setTeam2Wickets(10);
      }
    }
  }, [team1Overs, team2Overs, team1Wickets, team2Wickets, totalOvers]);

  const undo = () => {
    const lastEdit = undoTree.pop();

    if (!lastEdit) return;

    for (const action of lastEdit.actions) {
      if (action.key === "team1Name") setTeam1Name(action.value);
      if (action.key === "team2Name") setTeam2Name(action.value);
      if (action.key === "team1Overs") setTeam1Overs(action.value);
      if (action.key === "team2Overs") setTeam2Overs(action.value);
      if (action.key === "team1Runs") setTeam1Runs(action.value);
      if (action.key === "team2Runs") setTeam2Runs(action.value);
      if (action.key === "team1Wickets") setTeam1Wickets(action.value);
      if (action.key === "team2Wickets") setTeam2Wickets(action.value);
      if (action.key === "totalOvers") setTotalOvers(action.value);
    }
  };

  const updateTeamName = useCallback(
    (e: React.FormEvent<HTMLDivElement>, team: 1 | 2) => {
      const name = e.currentTarget.innerHTML;
      if (team === 1) {
        setTeam1Name(name);
      } else {
        setTeam2Name(name);
      }
      // undoTree.push({
      //   actions: [
      //     {
      //       key: team === 1 ? "team1Name" : "team2Name",
      //       value: name,
      //     },
      //   ],
      // });
    },
    []
  );
  const updateTeamRuns = useCallback(
    (e: React.FormEvent<HTMLSpanElement>, team: 1 | 2) => {
      const runs = parseInt(e.currentTarget.innerHTML);
      undoTree.push({
        actions: [
          {
            key: team === 1 ? "team1Runs" : "team2Runs",
            value: team === 1 ? team1Runs : team2Runs,
          },
        ],
      });
      if (team === 1) {
        setTeam1Runs(isNaN(runs) ? 0 : runs);
      } else {
        setTeam2Runs(isNaN(runs) ? 0 : runs);
      }
    },
    []
  );
  const updateTeamWickets = useCallback(
    (e: React.FormEvent<HTMLDivElement>, team: 1 | 2) => {
      const wickets = parseInt(e.currentTarget.innerHTML);
      undoTree.push({
        actions: [
          {
            key: team === 1 ? "team1Wickets" : "team2Wickets",
            value: team === 1 ? team1Wickets : team2Wickets,
          },
        ],
      });
      if (team === 1) {
        setTeam1Wickets(isNaN(wickets) ? 0 : wickets);
      } else {
        setTeam2Wickets(isNaN(wickets) ? 0 : wickets);
      }
    },
    []
  );
  const updateTeamOvers = useCallback(
    (e: React.FormEvent<HTMLDivElement>, team: 1 | 2) => {
      const overs = parseInt(e.currentTarget.innerHTML);
      undoTree.push({
        actions: [
          {
            key: team === 1 ? "team1Overs" : "team2Overs",
            value: team === 1 ? team1Overs : team2Overs,
          },
        ],
      });
      if (team === 1) {
        setTeam1Overs(isNaN(overs) ? 0 : overs);
      } else {
        setTeam2Overs(isNaN(overs) ? 0 : overs);
      }
    },
    []
  );

  const addOver = () => {
    undoTree.push({
      actions: [
        {
          key: currentTeam === 1 ? "team1Overs" : "team2Overs",
          value: currentTeam === 1 ? team1Overs : team2Overs,
        },
      ],
    });
    if (currentTeam === 1) {
      setTeam1Overs((prev) => prev + 1);
    } else {
      setTeam2Overs((prev) => prev + 1);
    }
  };

  const addRun = (run: number) => {
    undoTree.push({
      actions: [
        {
          key: currentTeam === 1 ? "team1Runs" : "team2Runs",
          value: currentTeam === 1 ? team1Runs : team2Runs,
        },
      ],
    });
    if (currentTeam === 1) {
      setTeam1Runs((prev) => prev + run);
    } else {
      setTeam2Runs((prev) => prev + run);
    }
  };

  const addWicket = () => {
    undoTree.push({
      actions: [
        {
          key: currentTeam === 1 ? "team1Wickets" : "team2Wickets",
          value: currentTeam === 1 ? team1Wickets : team2Wickets,
        },
      ],
    });
    if (currentTeam === 1) {
      setTeam1Wickets((prev) => prev + 1);
    } else {
      setTeam2Wickets((prev) => prev + 1);
    }
  };

  const swap = () => {
    undoTree.push({
      actions: [
        {
          key: "team1Name",
          value: team1Name,
        },
        {
          key: "team2Name",
          value: team2Name,
        },
      ],
    });
    const team1NameTemp = team1Name;
    setTeam1Name(team2Name);
    setTeam2Name(team1NameTemp);
  };

  const reset = () => {
    undoTree.push({
      actions: [
        {
          key: "team1Runs",
          value: team1Runs,
        },
        {
          key: "team2Runs",
          value: team2Runs,
        },
        {
          key: "team1Overs",
          value: team1Overs,
        },
        {
          key: "team2Overs",
          value: team2Overs,
        },
        {
          key: "team1Wickets",
          value: team1Wickets,
        },
        {
          key: "team2Wickets",
          value: team2Wickets,
        },
      ],
    });
    setTeam1Runs(0);
    setTeam1Wickets(0);
    setTeam1Overs(0);
    setTeam2Runs(0);
    setTeam2Wickets(0);
    setTeam2Overs(0);
    setCurrentTeam(1);
  };

  return (
    <div className="w-full h-svh bg-slate-800 text-slate-50">
      <main className="h-full max-w-sm mx-auto p-5 flex flex-col justify-center">
        <div className="grid grid-cols-2 gap-5">
          <div
            style={{
              opacity: currentTeam === 1 ? 1 : 0.7,
            }}
          >
            <p className="text-lg -mb-2 z-30" contentEditable>
              <ContentEditable
                html={team1Name}
                onChange={(e) => updateTeamName(e, 1)}
                tagName="span"
              />
            </p>
            <h2 className="text-5xl font-bold">
              <ContentEditable
                html={team1Runs.toString()}
                onChange={(e) => updateTeamRuns(e, 1)}
                tagName="span"
              />
              /
              <ContentEditable
                html={team1Wickets.toString()}
                onChange={(e) => updateTeamWickets(e, 1)}
                tagName="span"
              />
            </h2>
            <p className="text-lg">
              (ov.{" "}
              <ContentEditable
                html={team1Overs.toString()}
                onChange={(e) => updateTeamOvers(e, 1)}
                tagName="span"
              />
              )
            </p>
          </div>
          <div
            className="text-right"
            style={{
              opacity: currentTeam === 2 ? 1 : 0.7,
            }}
          >
            <p className="text-lg -mb-2 z-30" contentEditable>
              <ContentEditable
                html={team2Name}
                onChange={(e) => updateTeamName(e, 2)}
                tagName="span"
              />
            </p>
            <h2 className="text-5xl font-bold">
              <ContentEditable
                html={team2Runs.toString()}
                onChange={(e) => updateTeamRuns(e, 2)}
                tagName="span"
              />
              /
              <ContentEditable
                html={team2Wickets.toString()}
                onChange={(e) => updateTeamWickets(e, 2)}
                tagName="span"
              />
            </h2>
            <p className="text-lg">
              (ov.{" "}
              <ContentEditable
                html={team2Overs.toString()}
                onChange={(e) => updateTeamOvers(e, 2)}
                tagName="span"
              />
              )
            </p>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-6 gap-3">
          <button
            className="bg-slate-700 text-slate-50 p-3 rounded-lg col-span-2"
            onClick={() => addRun(1)}
          >
            1
          </button>
          <button
            className="bg-slate-700 text-slate-50 p-3 rounded-lg col-span-2"
            onClick={() => addRun(2)}
          >
            2
          </button>
          <button
            className="bg-slate-700 text-slate-50 p-3 rounded-lg col-span-2"
            onClick={() => addRun(3)}
          >
            3
          </button>
          <button
            className="bg-slate-700 text-slate-50 p-3 rounded-lg col-span-3"
            onClick={() => addRun(4)}
          >
            4
          </button>
          <button
            className="bg-slate-700 text-slate-50 p-3 rounded-lg col-span-3"
            onClick={() => addRun(6)}
          >
            6
          </button>
          <button
            className="bg-orange-200 text-orange-700 p-3 rounded-lg col-span-3"
            onClick={addOver}
          >
            Over
          </button>
          <button
            className="bg-yellow-200 text-yellow-700 p-3 rounded-lg col-span-3"
            onClick={addWicket}
          >
            Wicket
          </button>
          <button
            className="bg-green-200 text-green-700 p-3 rounded-lg col-span-6"
            onClick={undo}
          >
            Undo
          </button>
          <button
            className="bg-red-200 text-red-700 p-3 rounded-lg col-span-3"
            onClick={reset}
          >
            Reset
          </button>
          <button
            className="bg-blue-300 text-blue-700 p-3 rounded-lg col-span-3"
            onClick={swap}
          >
            Swap
          </button>
        </div>
        <p className="text-center mt-5">
          Total Overs:{" "}
          <ContentEditable
            html={totalOvers.toString()}
            tagName="span"
            onChange={(e) => {
              undoTree.push({
                actions: [
                  {
                    key: "totalOvers",
                    value: totalOvers,
                  },
                ],
              });
              const value = parseInt(e.currentTarget.innerHTML);
              setTotalOvers(isNaN(value) ? 0 : value);
            }}
          />
        </p>
      </main>
    </div>
  );
};
