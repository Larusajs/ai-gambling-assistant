"use client"

import { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

const profileSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  bio: z.string().max(160, {
    message: "Bio must not be longer than 160 characters.",
  }),
  location: z.string().optional(),
  website: z.string().url({
    message: "Please enter a valid URL.",
  }).optional().or(z.literal('')),
})

type ProfileFormValues = z.infer<typeof profileSchema>

// This would typically come from an API or database
const defaultValues: Partial<ProfileFormValues> = {
  name: "Enes Kutay Yarkan",
  email: "enes@taskium.dev",
  bio: "I'm a software developer passionate about AI and machine learning.",
  location: "San Francisco, CA",
  website: "https://larusajs.dev",
}

export default function ProfileForm() {
  const [isEditing, setIsEditing] = useState(false)
  const { toast } = useToast()

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues,
  })

  function onSubmit(data: ProfileFormValues) {
    // In a real application, you would send this data to your backend
    console.log(JSON.stringify(data, null, 2))
    setIsEditing(false)
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated.",
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} disabled={!isEditing} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} type="email" disabled={!isEditing} />
              </FormControl>
              <FormDescription>
                Your email address is used for account-related notifications.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little about yourself"
                  className="resize-none"
                  {...field}
                  disabled={!isEditing}
                />
              </FormControl>
              <FormDescription>
                Write a short bio about yourself. Max 160 characters.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input {...field} disabled={!isEditing} />
              </FormControl>
              <FormDescription>
                Where are you based? (Optional)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website</FormLabel>
              <FormControl>
                <Input {...field} type="url" disabled={!isEditing} />
              </FormControl>
              <FormDescription>
                Your personal or professional website. (Optional)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {isEditing ? (
          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </div>
        ) : (
          <Button type="button" onClick={() => setIsEditing(true)}>
            Edit Profile
          </Button>
        )}
      </form>
    </Form>
  )
}

