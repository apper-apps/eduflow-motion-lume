import React, { useState } from "react";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Select from "@/components/atoms/Select";
import Checkbox from "@/components/atoms/Checkbox";
import Card from "@/components/atoms/Card";
import { toast } from "react-toastify";

const Settings = ({ userRole = "admin" }) => {
  const [activeTab, setActiveTab] = useState("profile");
  const [settings, setSettings] = useState({
    profile: {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@eduflow.com",
      role: userRole,
      institution: "Stanford University",
      timezone: "America/Los_Angeles"
    },
    notifications: {
      emailDigest: true,
      courseUpdates: true,
      assignmentReminders: true,
      systemAlerts: false,
      marketingEmails: false
    },
    preferences: {
      theme: "dark",
      language: "en",
      dateFormat: "MM/dd/yyyy",
      timeFormat: "12h"
    },
    security: {
      twoFactorEnabled: false,
      sessionTimeout: "4h",
      loginAlerts: true
    }
  });

  const tabs = [
    { id: "profile", label: "Profile", icon: "User" },
    { id: "notifications", label: "Notifications", icon: "Bell" },
    { id: "preferences", label: "Preferences", icon: "Settings" },
    { id: "security", label: "Security", icon: "Shield" },
    ...(userRole === "admin" ? [
      { id: "billing", label: "Billing", icon: "CreditCard" },
      { id: "integrations", label: "Integrations", icon: "Plug" }
    ] : [])
  ];

  const handleSave = (section) => {
    toast.success(`${section} settings saved successfully`);
  };

  const renderProfileTab = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-6">
        <div className="w-20 h-20 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
          <ApperIcon name="User" size={32} className="text-white" />
        </div>
        <div>
          <Button variant="secondary" size="sm">
            <ApperIcon name="Upload" size={16} className="mr-2" />
            Change Photo
          </Button>
          <p className="text-sm text-gray-400 mt-2">JPG, PNG or GIF. Max size 2MB.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="First Name"
          value={settings.profile.firstName}
          onChange={(e) => setSettings({
            ...settings,
            profile: { ...settings.profile, firstName: e.target.value }
          })}
        />
        <Input
          label="Last Name"
          value={settings.profile.lastName}
          onChange={(e) => setSettings({
            ...settings,
            profile: { ...settings.profile, lastName: e.target.value }
          })}
        />
        <Input
          label="Email Address"
          type="email"
          value={settings.profile.email}
          onChange={(e) => setSettings({
            ...settings,
            profile: { ...settings.profile, email: e.target.value }
          })}
        />
        <Select
          label="Institution"
          value={settings.profile.institution}
          onChange={(e) => setSettings({
            ...settings,
            profile: { ...settings.profile, institution: e.target.value }
          })}
          options={[
            { value: "Stanford University", label: "Stanford University" },
            { value: "MIT", label: "MIT" },
            { value: "Harvard University", label: "Harvard University" }
          ]}
        />
      </div>

      <Button 
        onClick={() => handleSave("Profile")}
        variant="primary"
        className="w-full md:w-auto"
      >
        Save Changes
      </Button>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-white mb-4">Email Notifications</h3>
        <div className="space-y-4">
          <Checkbox
            label="Daily digest emails"
            description="Receive a summary of your daily activity"
            checked={settings.notifications.emailDigest}
            onChange={(e) => setSettings({
              ...settings,
              notifications: { ...settings.notifications, emailDigest: e.target.checked }
            })}
          />
          <Checkbox
            label="Course updates"
            description="Get notified about new course content and announcements"
            checked={settings.notifications.courseUpdates}
            onChange={(e) => setSettings({
              ...settings,
              notifications: { ...settings.notifications, courseUpdates: e.target.checked }
            })}
          />
          <Checkbox
            label="Assignment reminders"
            description="Receive reminders about upcoming assignment deadlines"
            checked={settings.notifications.assignmentReminders}
            onChange={(e) => setSettings({
              ...settings,
              notifications: { ...settings.notifications, assignmentReminders: e.target.checked }
            })}
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-white mb-4">System Notifications</h3>
        <div className="space-y-4">
          <Checkbox
            label="System alerts"
            description="Important system maintenance and security notifications"
            checked={settings.notifications.systemAlerts}
            onChange={(e) => setSettings({
              ...settings,
              notifications: { ...settings.notifications, systemAlerts: e.target.checked }
            })}
          />
          <Checkbox
            label="Marketing emails"
            description="Receive updates about new features and educational content"
            checked={settings.notifications.marketingEmails}
            onChange={(e) => setSettings({
              ...settings,
              notifications: { ...settings.notifications, marketingEmails: e.target.checked }
            })}
          />
        </div>
      </div>

      <Button 
        onClick={() => handleSave("Notifications")}
        variant="primary"
        className="w-full md:w-auto"
      >
        Save Preferences
      </Button>
    </div>
  );

  const renderPreferencesTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select
          label="Theme"
          value={settings.preferences.theme}
          onChange={(e) => setSettings({
            ...settings,
            preferences: { ...settings.preferences, theme: e.target.value }
          })}
          options={[
            { value: "dark", label: "Dark" },
            { value: "light", label: "Light" },
            { value: "auto", label: "Auto" }
          ]}
        />
        <Select
          label="Language"
          value={settings.preferences.language}
          onChange={(e) => setSettings({
            ...settings,
            preferences: { ...settings.preferences, language: e.target.value }
          })}
          options={[
            { value: "en", label: "English" },
            { value: "es", label: "Spanish" },
            { value: "fr", label: "French" }
          ]}
        />
        <Select
          label="Date Format"
          value={settings.preferences.dateFormat}
          onChange={(e) => setSettings({
            ...settings,
            preferences: { ...settings.preferences, dateFormat: e.target.value }
          })}
          options={[
            { value: "MM/dd/yyyy", label: "MM/dd/yyyy" },
            { value: "dd/MM/yyyy", label: "dd/MM/yyyy" },
            { value: "yyyy-MM-dd", label: "yyyy-MM-dd" }
          ]}
        />
        <Select
          label="Time Format"
          value={settings.preferences.timeFormat}
          onChange={(e) => setSettings({
            ...settings,
            preferences: { ...settings.preferences, timeFormat: e.target.value }
          })}
          options={[
            { value: "12h", label: "12 Hour" },
            { value: "24h", label: "24 Hour" }
          ]}
        />
      </div>

      <Button 
        onClick={() => handleSave("Preferences")}
        variant="primary"
        className="w-full md:w-auto"
      >
        Save Preferences
      </Button>
    </div>
  );

  const renderSecurityTab = () => (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-medium text-white mb-4">Two-Factor Authentication</h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-300 mb-1">Add an extra layer of security to your account</p>
            <p className="text-sm text-gray-400">Use an authenticator app or SMS verification</p>
          </div>
          <Button 
            variant={settings.security.twoFactorEnabled ? "destructive" : "primary"}
            size="sm"
          >
            {settings.security.twoFactorEnabled ? "Disable" : "Enable"}
          </Button>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select
          label="Session Timeout"
          value={settings.security.sessionTimeout}
          onChange={(e) => setSettings({
            ...settings,
            security: { ...settings.security, sessionTimeout: e.target.value }
          })}
          options={[
            { value: "1h", label: "1 Hour" },
            { value: "4h", label: "4 Hours" },
            { value: "8h", label: "8 Hours" },
            { value: "24h", label: "24 Hours" }
          ]}
        />
      </div>

      <div>
        <Checkbox
          label="Login alerts"
          description="Get notified when someone logs into your account from a new device"
          checked={settings.security.loginAlerts}
          onChange={(e) => setSettings({
            ...settings,
            security: { ...settings.security, loginAlerts: e.target.checked }
          })}
        />
      </div>

      <div className="space-y-3">
        <Button variant="secondary" className="w-full md:w-auto">
          Change Password
        </Button>
        <Button variant="destructive" className="w-full md:w-auto">
          Delete Account
        </Button>
      </div>
    </div>
  );

  const renderBillingTab = () => (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-white">Current Plan</h3>
          <Button variant="primary" size="sm">Upgrade</Button>
        </div>
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
            <ApperIcon name="Crown" size={24} className="text-primary" />
          </div>
          <div>
            <h4 className="font-medium text-white">Professional Plan</h4>
            <p className="text-gray-400">$49/month • Up to 1,000 students</p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-medium text-white mb-4">Billing Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input label="Billing Email" value="billing@stanford.edu" />
          <Input label="Tax ID" value="12-3456789" />
          <Input label="Address" value="450 Serra Mall" />
          <Input label="City, State, ZIP" value="Stanford, CA 94305" />
        </div>
      </Card>

      <Button 
        onClick={() => handleSave("Billing")}
        variant="primary"
        className="w-full md:w-auto"
      >
        Update Billing
      </Button>
    </div>
  );

  const renderTab = () => {
    switch (activeTab) {
      case "profile":
        return renderProfileTab();
      case "notifications":
        return renderNotificationsTab();
      case "preferences":
        return renderPreferencesTab();
      case "security":
        return renderSecurityTab();
      case "billing":
        return renderBillingTab();
      default:
        return renderProfileTab();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Settings</h1>
        <p className="text-gray-400">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card className="p-4">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 text-left rounded-lg transition-colors duration-200 ${
                    activeTab === tab.id
                      ? "bg-primary/20 text-primary border border-primary/30"
                      : "text-gray-300 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <ApperIcon name={tab.icon} size={16} />
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </nav>
          </Card>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <Card className="p-6">
            {renderTab()}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;