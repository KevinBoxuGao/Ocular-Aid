using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Diagnostics;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using Microsoft.Expression.Encoder.Devices;
using System.Collections.ObjectModel;
using System.Windows.Threading;
using System.ComponentModel;

namespace Digital_Wellbeing
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        
        public MainWindow()
        {
            InitializeComponent();
            Main.Navigate(new MainPage());
            MainPage.PageRefreshed += new EventHandler(timer_Tick);

            DispatcherTimer timer = new DispatcherTimer();
            timer.Interval = TimeSpan.FromSeconds(600);
            timer.Tick += timer_Tick;
            timer.Start();

            DispatcherTimer breakTimer = new DispatcherTimer();
            breakTimer.Interval = TimeSpan.FromSeconds(1200);
            breakTimer.Tick += breakTimer_Tick;
            breakTimer.Start();

            DispatcherTimer faceTimer = new DispatcherTimer();
            faceTimer.Interval = TimeSpan.FromSeconds(60);
            faceTimer.Tick += faceTimer_Tick;
            faceTimer.Start();
        }

        public void timer_Tick(object sender, EventArgs e)
        {
            run_script("test.py");
        }

        public void breakTimer_Tick(object sender, EventArgs e)
        {
            MessageBox.Show("Time to take a break and rest your eyes!");
        }

        public void faceTimer_Tick(object sender, EventArgs e)
        {
            run_script("face_detector.py");
        }

        private void run_script(string script)
        {
            ProcessStartInfo start = new ProcessStartInfo();
            start.FileName = @"C:\Python\Python37\python.exe";

            var errors = "";
            var results = "";
            var path = System.IO.Path.GetFullPath(script);

            start.Arguments = path;

            start.UseShellExecute = false;
            start.CreateNoWindow = true;
            start.RedirectStandardOutput = true;
            start.RedirectStandardError = true;
            using (Process process = Process.Start(start))
            {
                process.WaitForExit();
                errors = process.StandardError.ReadToEnd();
                results= process.StandardOutput.ReadToEnd();
            }
            Console.WriteLine("Errors:");
            Console.WriteLine(errors);
            Console.WriteLine("Results:");
            Console.WriteLine(results);
        }

        protected override void OnClosing(CancelEventArgs e)
        {
            // setting cancel to true will cancel the close request
            // so the application is not closed
            e.Cancel = true;

            this.Hide();
        }

        private void OpenWindow(object sender, RoutedEventArgs e)
        {
            this.Show();
        }

        private void CloseWindow(object sender, RoutedEventArgs e)
        {
            System.Windows.Application.Current.Shutdown();
        }

        private void NavigateToHome(object sender, RoutedEventArgs e)
        {
            Main.Content = new MainPage();
        }

        private void NavigateToSettings(object sender, RoutedEventArgs e)
        {
            Main.Content = new Settings();
        }
    }
}
