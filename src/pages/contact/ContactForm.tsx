import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ContactForm = ({ userRole }: { userRole: "teacher" | "student" | "admin" }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
        category: "general"
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        // Add your form submission logic here
    };

    const roleCategories = {
        student: [
            { value: "general", label: "General Inquiry" },
            { value: "course", label: "Course Questions" },
            { value: "payment", label: "Payment Issues" }
        ],
        teacher: [
            { value: "general", label: "General Inquiry" },
            { value: "course", label: "Course Management" },
            { value: "resources", label: "Teaching Resources" }
        ],
        admin: [
            { value: "general", label: "General Inquiry" },
            { value: "system", label: "System Issues" },
            { value: "accounts", label: "Account Management" }
        ]
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="mt-1"
                    />
                </div>
                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="mt-1"
                    />
                </div>
            </div>

            <div>
                <Label htmlFor="category">Category</Label>
                <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                >
                    <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                        {(roleCategories[userRole] || roleCategories.student).map((category: any) => (
                            <SelectItem key={category.value} value={category.value}>
                                {category.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div>
                <Label htmlFor="subject">Subject</Label>
                <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="mt-1"
                />
            </div>

            <div>
                <Label htmlFor="message">Message</Label>
                <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    required
                    className="mt-1"
                />
            </div>

            <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 transition-colors"
            >
                Send Message
            </Button>
        </form>
    );
};

export default ContactForm;