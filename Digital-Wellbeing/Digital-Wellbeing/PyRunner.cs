using System;
using System.Diagnostics;
using System.ComponentModel;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Digital_Wellbeing
{
    class PyRunner
    {
        private void Run_cmd(string videoFile)
        {
            ProcessStartInfo start = new ProcessStartInfo
            {
                FileName = "my/full/path/to/python.exe"
            };
            var script =  "path/to/script.py";
            start.Arguments = $"\"{script}\"\"{videoFile}\"";
            var errors =  "";
            var results = "";

            start.UseShellExecute = false;
            start.CreateNoWindow = true;
            start.RedirectStandardError = true;
            start.RedirectStandardOutput = true;
            using (Process process = Process.Start(start))
            {
                errors = process.StandardError.ReadToEnd();
                results = process.StandardOutput.ReadToEnd();
            }
        }
    }
}
