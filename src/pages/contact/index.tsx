import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MailIcon, ClockIcon, PhoneIcon } from "lucide-react"
import { useAuthContext } from "@/hooks";
import ContactForm from "./ContactForm";
import SimpleMapEmbed from "./SimpleMapEmbed";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2
        }
    }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.5 }
    }
};

const ContactPage = () => {
    const { auth } = useAuthContext();
    const userRole: "student" | "teacher" | "admin" = auth?.userData?.role as ("student" | "teacher" | "admin") || "student";

    const roleContacts = {
        student: {
            email: "support@edulearn.com",
            phone: "+1 (555) STUDENT",
            hours: "Mon-Fri, 9AM-5PM"
        },
        teacher: {
            email: "faculty@edulearn.com",
            phone: "+1 (555) TEACHER",
            hours: "Mon-Thu, 10AM-4PM"
        },
        admin: {
            email: "admin@edulearn.com",
            phone: "+1 (555) ADMIN",
            hours: "24/7 Priority Support"
        }
    };

    return (
        <motion.div
            className="container mx-auto px-4 py-12"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <motion.div variants={itemVariants} className="text-center mb-16">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                    Contact Us
                </h1>
                <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
                    Have questions? Our team is here to help you succeed in your learning journey.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <motion.div variants={itemVariants}>
                    <Card className="border-0 shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-2xl">Get in Touch</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ContactForm userRole={userRole} />
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <div className="space-y-8">
                        <motion.div variants={itemVariants}>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Your {userRole} Support</h2>
                            <div className="space-y-4">
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 bg-blue-100 p-3 rounded-lg">
                                        <MailIcon className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-lg font-medium text-gray-900">Email</h3>
                                        <p className="mt-1 text-gray-600">{roleContacts[userRole].email}</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="flex-shrink-0 bg-blue-100 p-3 rounded-lg">
                                        <PhoneIcon className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-lg font-medium text-gray-900">Phone</h3>
                                        <p className="mt-1 text-gray-600">{roleContacts[userRole].phone}</p>
                                    </div>
                                </div>

                                <div className="flex items-start">
                                    <div className="flex-shrink-0 bg-blue-100 p-3 rounded-lg">
                                        <ClockIcon className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <div className="ml-4">
                                        <h3 className="text-lg font-medium text-gray-900">Hours</h3>
                                        <p className="mt-1 text-gray-600">{roleContacts[userRole].hours}</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="pt-8 border-t border-gray-200">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Location</h2>
                            <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                                <div className="bg-gray-300 border-2 border-dashed rounded-xl w-full h-full flex items-center justify-center">
                                    <SimpleMapEmbed
                                        mapUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3310.919665029571!2d36.30615931521464!3d33.51358098072724!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1518e6dc413cc6a7%3A0x6b9f66ebd1e394f2!2sDamascus%2C%20Syria!5e0!3m2!1sen!2sus!4v1620000000000!5m2!1sen!2sus
"
                                    />
                                </div>
                            </div>
                            <p className="mt-4 text-gray-600">
                                Syria, Damascus City
                            </p>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default ContactPage;