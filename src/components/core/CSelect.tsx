import React, { useEffect, useRef, useState } from "react";

export interface CSelectOption {
    label: string;
    value: string;
    obj?: any;
}

interface CSelectItemProps {
    itemBackgroundColor?: string;
    itemColor?: string;
    itemWidth?: string;
    itemPadding?: string;
    isSelected?: boolean; // If the option is selected, this prop is extending to CSelectProps

    selectedItemBackgroundColor?: string;
    selectedItemColor?: string;

    // Popup Item Background Color on hover and active
    onHoverItemBackgroundColor?: string;
    onActiveItemBackgroundColor?: string;

    // Popup Item Color on hover and active
    onActiveItemColor?: string;
    onHoverItemColor?: string;

    option: CSelectOption | undefined;
    onClickOption: (option: CSelectOption | undefined) => void;
}

interface CSelectProps extends CSelectItemProps {
    options: CSelectOption[];
    defaultValue?: string | CSelectOption;

    boxWidth?: string | number;
    boxHeight?: string | number;
    popupWidth?: string | number;

    padding?: string | number;

    // Box Background
    boxBackgroundColor?: string;
    onHoverBoxBackgroundColor?: string;
    onActiveBoxBackgroundColor?: string;

    // Box Color
    boxColor?: string;
    onHoverBoxColor?: string;
    onActiveBoxColor?: string;

    // Box Border
    boxBorderWidth?: string | number;
    boxBorderColor?: string;
    boxBorderStyle?: string;
    boxBorderRadius?: string | number;

    // Box Border Color on hover and active
    onHoverBoxBorderColor?: string;
    onActiveBoxBorderColor?: string;

    // Popup Border Radius
    popupBorderRadius?: string | number;
    popupBorderColor?: string;
    popupBorderStyle?: string;
    popupBorderWidth?: string;

    // Popup Border Color on hover and active
    onHoverPopupBorderColor?: string;
    onActivePopupBorderColor?: string;

    // Popup container Background Color
    popupBackgroundColor?: string;

    openTransistion?: string;

    onHoverBoxFontWeight?: string;
    onHoverBoxFontSize?: string;
}

interface DownArrowSvgProps {
    width?: string | number;
    height?: string | number;
    viewBox?: string;
    color?: string;
    strokeWidth?: string | number;
}

const DownArrowIcon: React.FC<DownArrowSvgProps> = ({
    width,
    height,
    viewBox,
    color,
    strokeWidth,
}) => {
    const defaultProps: DownArrowSvgProps = {
        width: "12px",
        height: "12px",
        viewBox: "0 0 24 24",
        color: "#000000",
        strokeWidth: "1.5",
    };
    return (
        <svg
            width={width || defaultProps.width}
            height={height || defaultProps.height}
            viewBox={viewBox || defaultProps.viewBox}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M7 10L12 15L17 10"
                stroke={color || defaultProps.color}
                stroke-width={strokeWidth || defaultProps.strokeWidth}
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </svg>
    );
};

/**
 * @description CSelectItem component is not implemented yet
 * @param props CSelectItemProps
 * @returns CSelectItem
 */
const CSelectItem: React.FC<CSelectItemProps> = ({
    option,
    isSelected,
    itemWidth,
    itemPadding,
    selectedItemBackgroundColor,
    onClickOption,
}) => {
    const SelectedItemStyles = {
        backgroundColor: "#1356b9",
        color: "#FFFFFF",
        fontWeight: "600",
    };

    const DefaulItemStyles = {
        backgroundColor: "#1677FF",
        width: "100px",
        padding: "8px",
        marginBottom: "1px",
        color: "#FFFFFF",
        cursor: "pointer",
        userSelect: "none",
        transition: "background-color 0.2s ease",
        fontSize: "14px",
        borderRadius: "4px",
        overflow: "hidden",
        whiteSpace: "nowrap",
    };

    return (
        <div
            style={{
                width: itemWidth || DefaulItemStyles.width,
                padding: itemPadding || DefaulItemStyles.padding,
                backgroundColor: isSelected
                    ? selectedItemBackgroundColor || SelectedItemStyles.backgroundColor
                    : DefaulItemStyles.backgroundColor,
                cursor: DefaulItemStyles.cursor,
                color: DefaulItemStyles.color,
                transition: "background-color 0.15s ease",
                fontSize: DefaulItemStyles.fontSize,
                marginBottom: DefaulItemStyles.marginBottom,
                borderRadius: DefaulItemStyles.borderRadius,
            }}
            onClick={() => onClickOption(option)}
        >
            <div
                style={{
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                }}
                title={option?.label ?? option?.value ?? ""}
            >
                {option?.label ?? option?.value ?? ""}
            </div>
        </div>
    );
};

/**
 * @description CSelect component is not implemented yet
 * @param props CSelectProps
 * @returns CSelect
 */
const CSelect: React.FC<CSelectProps> = ({
    boxWidth,
    boxHeight,
    padding,
    boxBorderRadius,
    popupBorderRadius,
    boxBorderColor,
    boxBorderStyle,
    boxBorderWidth,
    popupBorderColor,
    popupBorderStyle,
    popupBorderWidth,
    boxBackgroundColor,
    boxColor,
    popupBackgroundColor,
    options,
    option,
    onClickOption,
    // popupWidth,
    // onHoverBoxBorderColor,
    // onActiveBoxBorderColor,
    // onHoverPopupBorderColor,
    // onActivePopupBorderColor,
    // onHoverBoxBackgroundColor,
    // onActiveBoxBackgroundColor,
    // onHoverItemBackgroundColor,
    // onActiveItemBackgroundColor,
    // onActiveItemColor,
    // onHoverItemColor,
    // openTransistion,
    // onHoverBoxColor,
    // onHoverBoxFontWeight,
    // onHoverBoxFontSize,
}) => {
    const DefaultBoxStyles = {
        width: "100px",
        height: "16px",
        padding: "8px",
        borderRadius: "4px",
        borderWidth: "2px",
        borderColor: "#1677ff",
        borderStyle: "solid",
        backgroundColor: "#1677ff",
        color: "#FFFFFF",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        overflow: "hidden",
        whiteSpace: "nowrap",
    };

    const DefaultPopupStyles = {
        borderRadius: "4px",
        borderWidth: "1px",
        borderColor: "#1677ff",
        borderStyle: "solid",
        backgroundColor: "#1677ff",
        color: "#FFFFFF",
    };

    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={ref} style={{ position: "relative" }}>
            {/* Box */}
            <div
                style={{
                    width: boxWidth || DefaultBoxStyles.width,
                    height: boxHeight || DefaultBoxStyles.height,
                    padding: padding || DefaultBoxStyles.padding,
                    borderRadius: boxBorderRadius || DefaultBoxStyles.borderRadius,
                    borderWidth: boxBorderWidth || DefaultBoxStyles.borderWidth,
                    borderColor: boxBorderColor || DefaultBoxStyles.borderColor,
                    borderStyle: boxBorderStyle || DefaultBoxStyles.borderStyle,
                    backgroundColor: boxBackgroundColor || DefaultBoxStyles.backgroundColor,
                    color: boxColor || DefaultBoxStyles.color,
                    display: DefaultBoxStyles.display,
                    justifyContent: DefaultBoxStyles.justifyContent,
                    alignItems: DefaultBoxStyles.alignItems,
                }}
                onClick={() => setOpen(!open)}
            >
                <p
                    style={{
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                    }}
                    title={option?.label ?? option?.value ?? "Select"}
                >
                    {option?.label ?? option?.value ?? "Select"}
                </p>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginLeft: "2px",
                    }}
                >
                    <DownArrowIcon width={22} height={22} color={"#FFFFFF"} />
                </div>
            </div>

            {/* Popup */}
            <div
                style={{
                    width: boxWidth,
                    borderRadius: popupBorderRadius || DefaultPopupStyles.borderRadius,
                    borderWidth: popupBorderWidth || DefaultPopupStyles.borderWidth,
                    borderColor: popupBorderColor || DefaultPopupStyles.borderColor,
                    borderStyle: popupBorderStyle || DefaultPopupStyles.borderStyle,
                    backgroundColor: popupBackgroundColor || DefaultPopupStyles.backgroundColor,
                    display: open ? "block" : "none",
                    position: "absolute",
                    top: "37px",
                    left: 0,
                    zIndex: 1000,
                }}
            >
                {options.map(opt => (
                    <CSelectItem
                        option={opt}
                        isSelected={opt.value === option?.value}
                        onClickOption={onClickOption}
                    />
                ))}
            </div>
        </div>
    );
};

export default CSelect;
