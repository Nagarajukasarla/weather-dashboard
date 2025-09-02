import GradientButton from "@/components/core/GradientButton";
import SparklesIcon from "@/components/core/SparkIcon";
import { GithubOutlined } from "@ant-design/icons";
import { Info } from "@/constants/info";

const Footer: React.FC = () => {
    return (
        <div className="flex-shrink-0 border-t border-border-hard p-4 flex items-center justify-center">
            <div className="flex items-center gap-12">
                <a href={Info.GITHUB}>
                    <GithubOutlined className="text-heading-h1 text-foreground"/>
                </a>
                <GradientButton
                    href={Info.PORTFOLIO}
                    variant="primary"
                    size="md"
                    className="w-[180px]"
                    icon={<SparklesIcon />}
                >
                    <p className="text-text-t2">KNOW ME</p>
                </GradientButton>
            </div>
        </div>
    );
};

export default Footer;
