import { ReusableCard } from '@/components/Reusable-Components'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from '@/components/ui/textarea';
import { useCurrentLangIsEnglish } from '@/hooks';
import { ICategory, ICourseDetails, ILevel } from '@/interfaces/course';
export default function CourseDetails({ form, categories, levels }: ICourseDetails) {
    const currentLang = useCurrentLangIsEnglish()
    console.log("data", categories)
    console.log("levels", levels)
    return (
        <ReusableCard
            title="Course Information"
            styleForCard="shadow-lg"
            titleStyle="text-3xl font-bold text-blue-950"
            styleForContent="space-y-6"
        >
            {/* title */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                    control={form.control}
                    name="titleCourseAR"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Course Title in Arabic</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="عنوان الدورة بالعربية" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="titleCourseEN"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Course Title in English</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Course title in English" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            {/* sub title */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                    control={form.control}
                    name="subTitleCourseAR"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Subtitle in Arabic</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="العنوان الفرعي بالعربية" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="subTitleCourseEN"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Subtitle in English</FormLabel>
                            <FormControl>
                                <Input {...field} placeholder="Course subtitle in English" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            {/* description */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                    control={form.control}
                    name="descriptionAR"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description in Arabic</FormLabel>
                            <FormControl>
                                <Textarea {...field} placeholder="وصف الدورة بالعربية" rows={4} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="descriptionEN"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description in English</FormLabel>
                            <FormControl>
                                <Textarea {...field} placeholder="Course description in English" rows={4} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            {/* category & level */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Course Category</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="اختر الفئة" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {(categories as ICategory[])?.map((category) => {
                                        const { title: {en, ar} } = category;
                                        return <SelectItem key={category._id} value={category._id}>
                                            {currentLang ? en : ar}
                                        </SelectItem>
                                        }
                                    )}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="level"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Course Level</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="اختر المستوى" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {(levels as ILevel[])?.map((level) => {
                                        const { title: {en, ar} } = level;
                                        return <SelectItem key={level._id} value={level._id}>
                                                {currentLang ? en : ar}
                                            </SelectItem>
                                        }
                                    )}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            {/* primary language & price */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Price in ($)</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    type="number"
                                    placeholder="0.00"
                                    onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="primaryLanguage"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Primary Language</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="اختر اللغة الأساسية" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {currentLang ? <>
                                        <SelectItem value="ar">Arabic</SelectItem>
                                        <SelectItem value="en">English</SelectItem>
                                        <SelectItem value="both">both of them</SelectItem> 
                                    
                                    </>
                                    :
                                    <>
                                    
                                    <SelectItem value="ar">عربي</SelectItem>
                                    <SelectItem value="en">إنجليزي</SelectItem>
                                    <SelectItem value="both">كلاهما</SelectItem>
                                    </>
                                    }
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            {/* objectives */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                    control={form.control}
                    name="objectivesAR"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Objectives in Arabic</FormLabel>
                            <FormControl>
                                <Textarea {...field} placeholder="أهداف الدورة بالعربية" rows={4} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="objectivesEN"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Objectives in English</FormLabel>
                            <FormControl>
                                <Textarea {...field} placeholder="Course objectives in English" rows={4} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            {/* welcome message */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                    control={form.control}
                    name="welcomeMessageAR"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Welcome Message in Arabic</FormLabel>
                            <FormControl>
                                <Textarea {...field} placeholder="رسالة الترحيب بالعربية" rows={3} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="welcomeMessageEN"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Welcome Message in English</FormLabel>
                            <FormControl>
                                <Textarea {...field} placeholder="Welcome message in English" rows={3} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </ReusableCard>
    )
}