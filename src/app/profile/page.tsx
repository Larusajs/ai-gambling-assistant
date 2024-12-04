'use client'

import { useState } from 'react'
import Navbar from '../../components/navbar'
import Footer from '../../components/footer'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { BarChart, Wallet, Settings, Bell } from 'lucide-react'

export default function ProfilePage() {
  const [notifications, setNotifications] = useState(true)

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="grid gap-6 md:grid-cols-[250px_1fr] lg:grid-cols-[300px_1fr]">
            <aside className="flex flex-col gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src="/placeholder.svg?height=64&width=64" alt="User avatar" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>John Doe</CardTitle>
                    <p className="text-sm text-muted-foreground">Premium Member</p>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Wallet className="h-4 w-4" />
                    <span>Balance: $1,000</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Bets</span>
                    <span className="font-medium">150</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Win Rate</span>
                    <span className="font-medium">62%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Profit</span>
                    <span className="font-medium text-green-600">+$2,500</span>
                  </div>
                </CardContent>
              </Card>
            </aside>
            <div className="space-y-6">
              <Card>
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="preferences">Preferences</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                  </TabsList>
                  <TabsContent value="overview" className="space-y-4">
                    <CardHeader>
                      <CardTitle>Gambling Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="h-[200px] w-full bg-muted rounded-md flex items-center justify-center">
                        <BarChart className="h-8 w-8 text-muted-foreground" />
                        <span className="ml-2 text-muted-foreground">Gambling Activity Chart</span>
                      </div>
                      <div className="grid gap-4 md:grid-cols-2">
                        <Card>
                          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Favorite Game</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold">Poker</div>
                            <p className="text-xs text-muted-foreground">
                              70% of total bets
                            </p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Best Winning Streak</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="text-2xl font-bold">7 Days</div>
                            <p className="text-xs text-muted-foreground">
                              Last month
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                    </CardContent>
                  </TabsContent>
                  <TabsContent value="preferences">
                    <CardHeader>
                      <CardTitle>Preferences</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="risk-level">Risk Level</Label>
                        <Input id="risk-level" type="range" min="1" max="10" />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="notifications"
                          checked={notifications}
                          onCheckedChange={setNotifications}
                        />
                        <Label htmlFor="notifications">Enable notifications</Label>
                      </div>
                    </CardContent>
                  </TabsContent>
                  <TabsContent value="security">
                    <CardHeader>
                      <CardTitle>Security Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input id="current-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input id="confirm-password" type="password" />
                      </div>
                      <Button>Update Password</Button>
                    </CardContent>
                  </TabsContent>
                </Tabs>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

