import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/Select";
import type { Option } from "@/types/component";

interface SSelectProps {
    options: Option[];
    value: Option;
    placeholder?: string;
    onValueChange: (value: Option) => void;
}

const SSelect: React.FC<SSelectProps> = ({ options, value, placeholder, onValueChange }) => {
    return (
        <Select
            
            value={value.key}
            onValueChange={selectedValue => {
                const val = options.find(val => val.key === selectedValue);
                if (!val) {
                    return;
                }
                onValueChange(val);
            }}
        >
            <SelectTrigger className="w-[200px]">
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                {options.map(opt => (
                    <SelectItem key={opt.key} value={opt.key}>
                        {opt.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export default SSelect;
