import ProfileForm from '@/components/profile-form'

export default function ProfilePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">User Profile</h1>
      <ProfileForm />
    </div>
  )
}