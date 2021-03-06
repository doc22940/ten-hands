import React from "react";
import { ThemeProvider } from "../shared/Themes";

// To disable no-submodule-imports, but tslint:disable:no-submodule-imports not working
// See https://stackoverflow.com/questions/54071852/tslint-always-enforcing-no-submodule-imports-rule-even-if-disabled
/* tslint:disable */
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
/* tslint:enable */

import { ConfigProvider } from "../shared/Config";
import { JobsProvider } from "../shared/Jobs";
import { ProjectsProvider } from "../shared/Projects";
import { SocketsProvider } from "../shared/Sockets";
import "./App.css";
import AppLayout from "./AppLayout";

const App = () => {
    return (
        <ConfigProvider>
            <ThemeProvider>
                <ProjectsProvider>
                    <JobsProvider>
                        <SocketsProvider>
                            <AppLayout />
                        </SocketsProvider>
                    </JobsProvider>
                </ProjectsProvider>
            </ThemeProvider>
        </ConfigProvider>
    );
};

export default App;
