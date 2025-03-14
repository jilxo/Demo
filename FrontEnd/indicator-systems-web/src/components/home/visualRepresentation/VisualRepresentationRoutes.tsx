import {Suspense} from "react";
import RouterWithDialog from "../../../lib/router/RouterWithDialog.tsx";
import {Route, Routes} from "react-router-dom";
import VisualRepresentationList from "../visualRepresentation/visualRepresentationList/VisualRepresentationList.tsx";
import VisualRepresentationNew from "../visualRepresentation/visualRepresentationNew/VisualRepresentationNew.tsx";
import VisualRepresentationEdit from "../visualRepresentation/visualRepresentationEdit/VisualRepresentationEdit.tsx";

/**
 * visualRepresentation routes
 */
export default function VisualRepresentationRoutes() {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <Suspense fallback={"🌀 Loading"}>
                        <RouterWithDialog component={<VisualRepresentationList/>}/>
                    </Suspense>
                }
            >
                <Route
                    path="new"
                    element={
                        <Suspense fallback={"🌀 Loading"}>
                            <VisualRepresentationNew/>
                        </Suspense>
                    }
                />
                <Route
                    path=":id/edit"
                    element={
                        <Suspense fallback={"🌀 Loading"}>
                            <VisualRepresentationEdit/>
                        </Suspense>
                    }
                />
            </Route>
        </Routes>
    );
}
