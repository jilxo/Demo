import {Suspense} from "react";
import RouterWithDialog from "../../../lib/router/RouterWithDialog.tsx";
import {Route, Routes} from "react-router-dom";
import MeasuringUnitList from "../measuringUnit/measuringUnitList/MeasuringUnitList.tsx";
import MeasuringUnitNew from "../measuringUnit/measuringUnitNew/MeasuringUnitNew.tsx";
import MeasuringUnitEdit from "../measuringUnit/measuringUnitEdit/MeasuringUnitEdit.tsx";

/**
 * measuringUnit routes
 */
export default function MeasuringUnitRoutes() {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <Suspense fallback={"🌀 Loading"}>
                        <RouterWithDialog component={<MeasuringUnitList/>}/>
                    </Suspense>
                }
            >
                <Route
                    path="new"
                    element={
                        <Suspense fallback={"🌀 Loading"}>
                            <MeasuringUnitNew/>
                        </Suspense>
                    }
                />
                <Route
                    path=":id/edit"
                    element={
                        <Suspense fallback={"🌀 Loading"}>
                            <MeasuringUnitEdit/>
                        </Suspense>
                    }
                />
            </Route>
        </Routes>
    );
}
