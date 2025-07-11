"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { createTeacher } from "@/lib/actions/teacher.actions"
import { redirect } from "next/navigation"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"  
import { subjects } from "@/constants"


const formSchema = z.object({
  name: z.string().min(1, {message: 'Tutor name is required.'}),
  subject: z.string().min(1, {message: 'Subject is required.'}),
  topic: z.string().min(1, {message: 'Topic is required.'}),
  style: z.string().min(1, {message: 'Style is required.'}),
  voice: z.string().min(1, {message: 'Voice is required.'}),
  duration: z.coerce.number().min(1, {message: 'Duration is required.'}),
})

const TeacherForm = () => {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            subject: '',
            topic: '',
            style: '',
            voice: '',
            duration: 15,
        },
    })
    
    // 2. Define a submit handler.
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const teacher = await createTeacher(values);

        if (teacher) {
          redirect(`/teachers/${teacher.id}`);
        }
        else {
          console.log('Failed to create tutor');
          alert('Failed to create tutor');
          redirect('/');
        }
    }


    return (
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold text-gray-700">Tutor Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter tutor name" {...field} 
                            className="input h-12 text-base"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold text-gray-700">Subject</FormLabel>
                      <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="input h-12 text-base capitalize">
                            <SelectValue placeholder="Select Subject" />
                        </SelectTrigger>
                        <SelectContent>
                            {subjects.map((subject) => (
                                <SelectItem
                                  value={subject}
                                  key={subject}
                                  className="capitalize"
                                >
                                    {subject}
                                </SelectItem>
                            ))}
                        </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="topic"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold text-gray-700">What should the tutor help with?</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Ex. Supervised Learning" {...field} 
                            className="input text-base min-h-[100px] resize-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="voice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold text-gray-700">Voice</FormLabel>
                      <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="input h-12 text-base">
                            <SelectValue placeholder="Select the voice" />
                        </SelectTrigger>
                        <SelectContent>
                             <SelectItem value='male'>
                                Male
                             </SelectItem>
                             <SelectItem value='female'>
                                Female
                             </SelectItem>
                        </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="style"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold text-gray-700">Style</FormLabel>
                      <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="input h-12 text-base">
                            <SelectValue placeholder="Select the style" />
                        </SelectTrigger>
                        <SelectContent>
                             <SelectItem value='formal'>
                                Formal
                             </SelectItem>
                             <SelectItem value='casual'>
                                Casual
                             </SelectItem>
                        </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="duration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-semibold text-gray-700">Estimated Session Duration in Minutes</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="15" {...field} 
                            className="input h-12 text-base"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                    type="submit" 
                    className="w-full h-14 text-lg font-semibold cursor-pointer btn-primary shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
                >
                    Build Tutor
                </Button>
              </form>
            </Form>
        </div>
      )
}

export default TeacherForm