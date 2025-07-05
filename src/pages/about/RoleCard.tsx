import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const RoleCard = ({ role, title, description, icon }: { icon: any; title: string; description: string; role: "student" | "admin" | "teacher" }) => {
    const roleColors = {
        student: "bg-blue-50 border-blue-200",
        teacher: "bg-green-50 border-green-200",
        admin: "bg-purple-50 border-purple-200"
    };

    const roleIcons = {
        student: "🎓",
        teacher: "👩‍🏫",
        admin: "👨‍💼"
    };

    return (
        <motion.div
            whileHover={{
                y: -10,
                transition: { duration: 0.3 }
            }}
        >
            <Card className={`h-full border ${roleColors[role]}`}>
                <CardHeader>
                    <div className="text-4xl mb-4">{icon || roleIcons[role]}</div>
                    <CardTitle className="text-2xl">{title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-600 mb-6">{description}</p>
                    <Button variant="outline" className="w-full">
                        Learn More
                    </Button>
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default RoleCard;