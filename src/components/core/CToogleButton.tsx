import React from "react";

interface CToogleButtonProps {
    /**
     * Value of the toggle button
     */
    value: boolean;
    /**
     * Function to be called when the toggle button is clicked
     */
    setValue: (value: boolean) => void;
    /**
     * Labels for the toggle button
     */
    labels?: string[] | string;
    /**
     * Position of the labels
     */
    position?: "left" | "right";
}

/**
 * Toggle button component
 */
const CToogleButton: React.FC<CToogleButtonProps> = ({ value, setValue, labels, position }) => {
    const isArray = Array.isArray(labels);
    return (
        <>
            <div className="flex">
                <span
                    className={`
                        text-text-t1 text-foreground-surface mr-3
                        ${(position && position === "left") || isArray ? " block inline " : " block hidden "}
                    `}
                >
                    {isArray && labels ? labels[0] : labels}
                </span>
                <label className="relative w-[50px] h-[24px] mr-3">
                    <input
                        type="checkbox"
                        checked={value}
                        onChange={() => setValue(!value)}
                        style={{ opacity: 0, width: 0, height: 0 }}
                    />
                    <span
                        className={`
                            absolute cursor-pointer
                            ${value ? " bg-background-toggle-active" : " bg-background-toggle-muted"}
                            rounded-[24px]
                            top-0 left-0 right-0 bottom-0
                        `}
                        style={{ transition: "0.4s" }}
                    >
                        <span
                            className={`
                                absolute ${value ? " left-[26px] " : " left-[4px] "} bg-background-foreground
                                cursor-pointer
                                rounded-[50%]
                                top-[0.2rem]
                                w-[18px]
                                h-[18px]
                            `}
                            style={{ transition: "0.4s" }}
                        />
                    </span>
                </label>
                <span
                    className={`
                        text-text-t1 text-foreground-surface 
                        ${(position && position === "left") || isArray ? " block inline " : " block hidden "}
                    `}
                >
                    {isArray && labels ? labels[1] : labels}
                </span>
            </div>
        </>
    );
};

export default CToogleButton;