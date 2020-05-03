using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using System.Windows.Threading;

namespace Digital_Wellbeing
{
    /// <summary>
    /// Interaction logic for MainPage.xaml
    /// </summary>
    public partial class MainPage : Page
    {
        public int timeUntilBreak = 20;
        public static event EventHandler PageRefreshed;
        public MainPage()
        {
            InitializeComponent();
            DispatcherTimer breakTimer = new DispatcherTimer();
            breakTimer.Interval = TimeSpan.FromSeconds(60);
            breakTimer.Tick += breakTimer_Tick;
            breakTimer.Start();
        }

        public void breakTimer_Tick(object sender, EventArgs e)
        {
            if (timeUntilBreak == 1)
            {
                timeUntilBreak = 20;
            } else
            {
                timeUntilBreak--;
            }
            timeLeft.Text = timeUntilBreak.ToString();
        }

        private void Settings(object sender, RoutedEventArgs e)
        {
            NavigationService.Navigate(new Settings());
        }

        public void Refresh(object sender, RoutedEventArgs e)
        {
            PageRefreshed?.Invoke(this, e);
        }
    }
}
