import { IResizeEntry, ResizeSensor } from "@blueprintjs/core";
import debounce from "lodash/debounce";
import React, { useEffect } from "react";
import styled from "styled-components";
import { useConfig } from "../shared/Config";
import JobTerminal from "../shared/JobTerminal";
import JobTerminalManager from "../shared/JobTerminalManager";
import { useTheme } from "../shared/Themes";

interface ICommandProps {
    room: string;
    index: number;
}

const TerminalContainer = styled.div`
    flex: 1;
    max-width: 100%;
    padding: 10px;
    white-space: pre-wrap;
`;

const getSanitizedTerminalOptions = (options: object) => {
    const allowedOptions = ["fontFamily"];
    const sanitizedOptions = {};
    Object.entries(options).map(([key, value]) => {
        if (allowedOptions.indexOf(key) > -1) {
            sanitizedOptions[key] = value;
        }
    });
    return sanitizedOptions;
};

const CommandOutputXterm: React.FC<ICommandProps> = React.memo(({ room, index }) => {
    const elRef = React.useRef<HTMLDivElement>(null);
    const terminal = React.useRef<JobTerminal | null>(null);
    const { theme } = useTheme();
    const currentTheme = React.useRef<any>(null);
    const themeTimeout = React.useRef<any>(null);
    const { config } = useConfig();

    const setTheme = () => {
        if (terminal && terminal.current) {
            terminal.current.setTheme(theme);
            if (currentTheme && currentTheme.current) {
                currentTheme.current = theme;
            }
        }
    };

    const removeTheme = () => {
        if (terminal && terminal.current) {
            terminal.current.removeTheme();
        }
    };

    /* eslint-disable react-hooks/exhaustive-deps */
    useEffect(() => {
        if (elRef && elRef.current) {
            if (terminal.current === null) {
                if (config.terminalOptions) {
                    const sanitizedTerminalOptions = getSanitizedTerminalOptions(config.terminalOptions);
                    console.log("sanitizedTerminalOptions:", sanitizedTerminalOptions);
                    terminal.current = JobTerminalManager.getInstance().createJobTerminal(
                        room,
                        sanitizedTerminalOptions,
                    );
                } else {
                    terminal.current = JobTerminalManager.getInstance().createJobTerminal(room);
                }
                terminal.current.attachTo(elRef.current);
            }
        }
    }, []);

    useEffect(() => {
        if (!config.enableTerminalTheme) {
            removeTheme();
        }

        setTheme();

        return () => {
            // Remove unmounting
            removeTheme();
            if (themeTimeout.current) {
                clearTimeout(themeTimeout.current);
            }
        };
    }, [theme, config, index]);

    const handleResize = React.useCallback(
        debounce((entries: IResizeEntry[]) => {
            let resizeTimeout: any = null;
            const resizeLater = () => {
                resizeTimeout = setTimeout(() => {
                    if (terminal && terminal.current && entries.length > 0) {
                        const width: number = entries[0].contentRect.width;
                        terminal.current.resizeTerminal(width);
                    }
                }, 0);
            };
            resizeLater();
            return () => {
                clearTimeout(resizeTimeout);
            };
        }, 50),
        [terminal],
    );

    return (
        <ResizeSensor onResize={handleResize}>
            <TerminalContainer ref={elRef} />
        </ResizeSensor>
    );
});

export default CommandOutputXterm;
