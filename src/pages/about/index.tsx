import { motion } from "framer-motion";
import TeamMember from "./TeamMember";
import RoleCard from "./RoleCard";

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
    hidden: { y: 30, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.6 }
    }
};

const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } }
};

const AboutPage = () => {
    const teamMembers = [
        {
            name: "Tammam Mabroukeh",
            role: "Front-End Developer",
            bio: "Frontend developer and Education technology expert with 2+ years in online learning",
            image: ""
        },
        {
            name: "Noor Aldeen Balsha",
            role: "Back-End Developer",
            bio: "Backend devloper and Curriculum developer and former university professor",
            image: ""
        },
        {
            name: "Sarieh Al Tabbaa",
            role: "Full Stack Devloper",
            bio: "Full-stack developer specializing in educational platforms",
            image: ""
        },
        {
            name: "Kinan Aleish",
            role: "Game Devloper",
            bio: "Game developer specializing in Unity and educational gaming",
            image: ""
        },
        {
            name: "Amer Mahfaud",
            role: "Back-End Devloper",
            bio: "Backend developer specializing in JavaScript language and former university professor",
            image: ""
        }
    ];

    const stats = [
        { value: "50K+", label: "Active Students" },
        { value: "1.2K", label: "Expert Instructors" },
        { value: "500+", label: "Courses Available" },
        { value: "95%", label: "Satisfaction Rate" }
    ];

    return (
        <motion.div
            className="container mx-auto px-4 py-16"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            {/* Hero Section */}
            <motion.div
                className="text-center mb-20"
                variants={fadeIn}
            >
                <motion.h1
                    className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
                    variants={itemVariants}
                >
                    Transforming Education Through Technology
                </motion.h1>
                <motion.p
                    className="text-xl text-gray-600 max-w-3xl mx-auto"
                    variants={itemVariants}
                >
                    We're on a mission to make quality education accessible to everyone, everywhere.
                </motion.p>
            </motion.div>

            {/* Stats Section */}
            <motion.div
                className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
                variants={containerVariants}
            >
                {stats.map((stat, index) => (
                    <motion.div
                        key={index}
                        className="text-center"
                        variants={itemVariants}
                    >
                        <p className="text-4xl font-bold text-blue-600">{stat.value}</p>
                        <p className="text-lg text-gray-600 mt-2">{stat.label}</p>
                    </motion.div>
                ))}
            </motion.div>

            {/* Our Story */}
            <motion.div
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20"
                variants={containerVariants}
            >
                <motion.div variants={itemVariants}>
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
                    <p className="text-lg text-gray-600 mb-4">
                        Founded in 2025, EduLearn started as a small project between educators and technologists
                        who believed online learning could be better. Frustrated by outdated platforms and
                        impersonal experiences, we set out to build something different.
                    </p>
                    <p className="text-lg text-gray-600">
                        Today, we serve learners across 120 countries with a platform that combines cutting-edge
                        technology with pedagogical best practices. Our commitment remains the same: to empower
                        learners and educators through innovative educational tools.
                    </p>
                </motion.div>
                <motion.div
                    className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-80"
                    variants={itemVariants}
                />
            </motion.div>

            {/* Team Section */}
            <motion.div className="mb-20" variants={fadeIn}>
                <h2 className="text-3xl font-bold text-gray-900 text-center mb-16">Meet Our Leadership</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {teamMembers.map((member, index) => (
                        <TeamMember
                            key={index}
                            member={member}
                            variants={itemVariants}
                        />
                    ))}
                </div>
            </motion.div>

            {/* For Different Roles */}
            <motion.div variants={fadeIn}>
                <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Designed For You</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <RoleCard
                        role="student"
                        title="Students"
                        description="Access world-class education with flexible learning paths and interactive content."
                        icon="🎓"
                    />
                    <RoleCard
                        role="teacher"
                        title="Instructors"
                        description="Create and deliver engaging courses with our powerful teaching tools and analytics."
                        icon="👩‍🏫"
                    />
                    <RoleCard
                        role="admin"
                        title="Administrators"
                        description="Manage your educational institution with comprehensive oversight and reporting."
                        icon="👨‍💼"
                    />
                </div>
            </motion.div>
        </motion.div>
    );
};

export default AboutPage;