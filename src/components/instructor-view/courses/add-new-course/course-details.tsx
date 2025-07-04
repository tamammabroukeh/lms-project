import { ReusableCard } from '@/components/Reusable-Components'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { ReusableInput } from '@/components/Reusable-Components';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from '@/components/ui/textarea';
import { useCurrentLangIsEnglish, useTypedTranslation } from '@/hooks';
import { ICategory, ICourseDetails, ILevel } from '@/interfaces/course';
export default function CourseDetails({ errors, form, categories, levels }: ICourseDetails) {
    const currentLang = useCurrentLangIsEnglish()
    const { t } = useTypedTranslation()
    console.log("data", categories)
    console.log("levels", levels)
    return (
        <ReusableCard
            title={t("course:course_information")}
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
                            <FormLabel>{t("course:course_title_in_arabic")}</FormLabel>
                            <FormControl>
                                <ReusableInput
                                    className={`bg-white w-full h-10`}
                                    hasError={!!errors[field.name]}
                                    placeholder={t("course:course_title_in_arabic")}
                                    {...field}
                                />
                            </FormControl>
                            {errors[field.name] && <FormMessage>{errors[field.name] as any}</FormMessage>}
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="titleCourseEN"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("course:course_title_in_english")}</FormLabel>
                            <FormControl>
                                <ReusableInput
                                    className={`bg-white w-full h-10`}
                                    hasError={!!errors[field.name]}
                                    placeholder={t("course:course_title_in_english")}
                                    {...field}
                                />
                            </FormControl>
                            {errors[field.name] && <FormMessage>{errors[field.name] as any}</FormMessage>}
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
                            <FormLabel>{t("course:sub_title_in_arabic")}</FormLabel>
                            <FormControl>
                                <ReusableInput
                                    className={`bg-white w-full h-10`}
                                    hasError={!!errors[field.name]}
                                    placeholder={t("course:sub_title_in_arabic")}
                                    {...field}
                                />
                            </FormControl>
                            {errors[field.name] && <FormMessage>{errors[field.name] as any}</FormMessage>}
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="subTitleCourseEN"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("course:sub_title_in_english")}</FormLabel>
                            <FormControl>
                                <ReusableInput
                                    className={`bg-white w-full h-10`}
                                    hasError={!!errors[field.name]}
                                    placeholder={t("course:sub_title_in_english")}
                                    {...field}
                                />
                            </FormControl>
                            {errors[field.name] && <FormMessage>{errors[field.name] as any}</FormMessage>}
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
                            <FormLabel>{t("course:description_in_arabic")}</FormLabel>
                            <FormControl>
                                <Textarea {...field} placeholder={t("course:description_in_arabic")} rows={4} />
                            </FormControl>
                            {errors[field.name] && <FormMessage>{errors[field.name] as any}</FormMessage>}
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="descriptionEN"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("course:description_in_english")}</FormLabel>
                            <FormControl>
                                <Textarea {...field} placeholder={t("course:description_in_english")} rows={4} />
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
                            <FormLabel>{t("course:course_category")}</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder={t("course:course_category")} />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {(categories as ICategory[])?.map((category) => {
                                        const { title: { en, ar } } = category;
                                        return <SelectItem key={category._id} value={currentLang ? category.title.en : category.title.ar}>
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
                            <FormLabel>{t("course:course_level")}</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder={t("course:course_level")} />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {(levels as ILevel[])?.map((level) => {
                                        const { title: { en, ar } } = level;
                                        return <SelectItem key={level._id} value={currentLang ? level.title.en : level.title.ar}>
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
                            <FormLabel>{t("course:price")} ($)</FormLabel>
                            <FormControl>
                                <ReusableInput
                                    {...field}
                                    className={`bg-white w-full h-10`}
                                    hasError={!!errors[field.name]}
                                    type="number"
                                    placeholder="0.00"
                                    onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                />
                            </FormControl>
                            {errors[field.name] && <FormMessage>{errors[field.name] as any}</FormMessage>}
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="primaryLanguage"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{t("course:primary_language")}</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder={t("course:primary_language")} />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {currentLang ? <>
                                        <SelectItem value="Arabic">{t("course:arabic")}</SelectItem>
                                        <SelectItem value="English">{t("course:english")}</SelectItem>
                                        <SelectItem value="both">{t("course:both")}</SelectItem>

                                    </>
                                        :
                                        <>

                                            <SelectItem value="ar">{t("course:arabic")}</SelectItem>
                                            <SelectItem value="en">{t("course:english")}</SelectItem>
                                            <SelectItem value="both">{t("course:both")}</SelectItem>
                                        </>
                                    }
                                </SelectContent>
                            </Select>
                            {errors[field.name] && <FormMessage>{errors[field.name] as any}</FormMessage>}
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
                            <FormLabel>{t("course:objectives_in_arabic")}</FormLabel>
                            <FormControl>
                                <Textarea {...field} placeholder={t("course:objectives_in_arabic")} rows={4} />
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
                            <FormLabel>{t("course:objectives_in_english")}</FormLabel>
                            <FormControl>
                                <Textarea {...field} placeholder={t("course:objectives_in_english")} rows={4} />
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
                            <FormLabel>{t("course:welcome_in_arabic")}</FormLabel>
                            <FormControl>
                                <Textarea {...field} placeholder={t("course:welcome_in_arabic")} rows={3} />
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
                            <FormLabel>{t("course:welcome_in_english")}</FormLabel>
                            <FormControl>
                                <Textarea {...field} placeholder={t("course:welcome_in_english")} rows={3} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </ReusableCard>
    )
}