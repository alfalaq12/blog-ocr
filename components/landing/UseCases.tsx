"use client";

import { Card } from "@/components/ui/Card";
import { FileText, CreditCard, IdCard, Building, GraduationCap, Hospital } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n";

export function UseCases() {
    const { t } = useLanguage();

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring" as const,
                stiffness: 50,
                damping: 20
            }
        }
    };

    const icons = {
        invoice: <FileText className="w-6 h-6" />,
        receipt: <CreditCard className="w-6 h-6" />,
        id: <IdCard className="w-6 h-6" />,
        government: <Building className="w-6 h-6" />,
        education: <GraduationCap className="w-6 h-6" />,
        healthcare: <Hospital className="w-6 h-6" />,
    };

    return (
        <section className="py-20 md:py-32 bg-black relative overflow-hidden" id="use-cases">
            {/* Background Glow */}
            <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl mb-6">
                        <span className="text-transparent bg-clip-text bg-linear-to-b from-white to-gray-500">
                            {t.useCases.title}
                        </span>
                    </h2>
                    <p className="text-gray-400 text-lg font-light leading-relaxed max-w-2xl mx-auto">
                        {t.useCases.description}
                    </p>
                </motion.div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {t.useCases.items.map((useCase, index) => (
                        <motion.div key={index} variants={item} className="group">
                            <UseCaseCard
                                icon={icons[useCase.icon as keyof typeof icons]}
                                title={useCase.title}
                                description={useCase.description}
                                iconColor={useCase.iconColor}
                                iconBg={useCase.iconBg}
                                iconBorder={useCase.iconBorder}
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

interface UseCaseCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    iconColor: string;
    iconBg: string;
    iconBorder: string;
}

function UseCaseCard({ icon, title, description, iconColor, iconBg, iconBorder }: UseCaseCardProps) {
    return (
        <Card className="relative h-full flex flex-col p-6 bg-[#0A0A0A]/80 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500 group">
            {/* Corner Glow */}
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-blue-500/20 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-indigo-500/20 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

            {/* Icon */}
            <div className={`inline-flex p-3 rounded-xl ${iconBg} border ${iconBorder} ${iconColor} mb-4 w-fit group-hover:scale-110 transition-transform duration-300`}>
                {icon}
            </div>

            {/* Title */}
            <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-indigo-400 transition-colors">
                {title}
            </h3>

            {/* Description */}
            <p className="text-gray-400 text-sm leading-relaxed">
                {description}
            </p>
        </Card>
    );
}
