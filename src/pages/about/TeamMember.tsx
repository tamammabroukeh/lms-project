import { motion } from "framer-motion";

const TeamMember = ({ member, variants }: any) => {
    return (
        <motion.div
            className="text-center"
            variants={variants}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
        >
            <div className="bg-gray-200 border-2 border-dashed rounded-full w-48 h-48 mx-auto mb-6" />
            <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
            <p className="text-blue-600 mt-1">{member.role}</p>
            <p className="text-gray-600 mt-3">{member.bio}</p>
        </motion.div>
    );
};

export default TeamMember;