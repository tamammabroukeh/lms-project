import { motion } from "framer-motion";
import {
    GithubIcon,
    TwitterIcon,
    LinkedinIcon,
    MailIcon,
    PhoneIcon,
    MapPinIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTypedTranslation } from "@/hooks";


export function SiteFooter() {
    const { t } = useTypedTranslation()
    const footerLinks = [
        {
            title: t("course:explore"),
            links: [
                { name: t("course:courses"), href: "/courses" },
                { name: t("course:instructors"), href: "/instructors" },
                { name: t("course:pricing"), href: "/pricing" },
                { name: t("course:webinars"), href: "/webinars" },
            ],
        },
        {
            title: t("course:company"),
            links: [
                { name: t("course:about_us"), href: "/about" },
                { name: t("course:careers"), href: "/careers" },
                { name: t("course:blog"), href: "/blog" },
                { name: t("course:contact_us"), href: "/contact" },
            ],
        },
        {
            title: t("course:support"),
            links: [
                { name: t("course:help_center"), href: "/support" },
                { name: t("course:terms_of_Service"), href: "/tos" },
                { name: t("course:privacy_policy"), href: "/privacy" },
                { name: t("course:accessibility"), href: "/accessibility" },
            ],
        },
    ];

    const socialLinks = [
        { icon: <GithubIcon className="h-5 w-5" />, href: "#" },
        { icon: <TwitterIcon className="h-5 w-5" />, href: "#" },
        { icon: <LinkedinIcon className="h-5 w-5" />, href: "#" },
    ];

    const contactInfo = [
        { icon: <MailIcon className="h-5 w-5" />, text: "contact@edulearn.com" },
        { icon: <PhoneIcon className="h-5 w-5" />, text: "+963 11 123 4567" },
        { icon: <MapPinIcon className="h-5 w-5" />, text: "Damascus, Syria" },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
            },
        },
    };
    return (
        <motion.footer
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="bg-gray-900 text-gray-100"
        >
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Newsletter Section */}
                    <motion.div variants={itemVariants} className="space-y-4">
                        <h3 className="text-xl font-bold">{t("course:stay_updated")}</h3>
                        <p className="text-gray-400">
                            {t("course:subscribe_to_our_newsletter_for_the_latest_courses_and_updates")}.
                        </p>
                        <div className="flex gap-2">
                            <Input
                                type="email"
                                placeholder={t("auth:email")}
                                className="bg-gray-800 border-gray-700 text-white"
                            />
                            <Button variant="secondary">{t("course:subscribe")}</Button>
                        </div>
                    </motion.div>

                    {/* Footer Links */}
                    {footerLinks.map((section) => (
                        <motion.div key={section.title} variants={itemVariants} className="space-y-4">
                            <h3 className="text-xl font-bold">{section.title}</h3>
                            <ul className="space-y-3">
                                {section.links.map((link) => (
                                    <li key={link.name}>
                                        <a
                                            href={link.href}
                                            className="text-gray-400 hover:text-white transition-colors"
                                        >
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}

                    {/* Contact Info */}
                    <motion.div variants={itemVariants} className="space-y-4">
                        <h3 className="text-xl font-bold">{t("course:contact_us")}</h3>
                        <ul className="space-y-3">
                            {contactInfo.map((item, index) => (
                                <li key={index} className="flex items-center gap-3">
                                    <span className="text-blue-400">{item.icon}</span>
                                    <span className="text-gray-400">{item.text}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </div>

                <div className="h-px my-8 bg-gray-700" />

                <motion.div
                    variants={containerVariants}
                    className="flex flex-col md:flex-row justify-between items-center gap-6"
                >
                    <motion.p variants={itemVariants} className="text-gray-400 text-sm">
                        © {new Date().getFullYear()} EduLearn. {t("course:all_rights_reserved")}
                    </motion.p>

                    <motion.div variants={itemVariants} className="flex gap-4">
                        {socialLinks.map((social, index) => (
                            <motion.a
                                key={index}
                                href={social.href}
                                whileHover={{ y: -3 }}
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                {social.icon}
                            </motion.a>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </motion.footer>
    );
}