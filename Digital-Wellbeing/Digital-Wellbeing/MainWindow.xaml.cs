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
        }

        private void Page1(object sender, RoutedEventArgs e)
        {
            //Console.WriteLine("This is page1");
            Main.Navigate(new Page1());
        }

        private void Page2(object sender, RoutedEventArgs e)
        {
            //Console.WriteLine("This is page2");
            Main.Navigate(new Page2());
        }

        private void Main_Navigated(object sender, NavigationEventArgs e)
        {

        }
    }
}
