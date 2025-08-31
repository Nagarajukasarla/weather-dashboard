import GradientButton from "@/components/core/GradientButton";
import SparklesIcon from "@/components/core/SparkIcon";
import { GithubOutlined } from "@ant-design/icons";

const Footer: React.FC = () => {
    return (
        <div className="flex-shrink-0 border-t p-4 flex items-center justify-center">
            <div className="flex items-center gap-2">
                <GithubOutlined />
                <GradientButton variant="primary" size="md" className="w-[180px]" icon={<SparklesIcon />}>
                    KNOW ME
                </GradientButton>
            </div>
        </div>
    );
};

export default Footer;
