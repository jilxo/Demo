import {Suspense} from "react";
import RouterWithDialog from "../../../lib/router/RouterWithDialog.tsx";
import {Route, Routes} from "react-router-dom";
import VariableList from "../variable/variableList/VariableList.tsx";
import VariableNew from "../variable/variableNew/VariableNew.tsx";
import VariableEdit from "../variable/variableEdit/VariableEdit.tsx";

/**
 * variable routes
 */
export default function VariableRoutes() {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <Suspense fallback={"🌀 Loading"}>
                        <RouterWithDialog component={<VariableList/>}/>
                    </Suspense>
                }
            >
                <Route
                    path="new"
                    element={
                        <Suspense fallback={"🌀 Loading"}>
                            <VariableNew/>
                        </Suspense>
                    }
                />
                <Route
                    path=":id/edit"
                    element={
                        <Suspense fallback={"🌀 Loading"}>
                            <VariableEdit/>
                        </Suspense>
                    }
                />
            </Route>
        </Routes>
    );
}
