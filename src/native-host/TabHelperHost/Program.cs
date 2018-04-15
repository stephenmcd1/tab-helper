using System;
using System.Linq;
using System.Windows.Forms;

namespace TabHelperHost
{
    public static class Program
    {
        public const string UniqueAppName = "RSS.SM.TabHelperHostPipe";

        public static void Main(string[] args)
        {
            if (args.Length < 2)
            {
                //We need at least a few arguments otherwise we don't know what to do
                Console.WriteLine("Not enough command line arguments");
            }
            else if (args[0].StartsWith("chrome-extension"))
            {
                //If we got launched from Chrome, start/run the native host logic
                ChromeHost.Run();
            }
            else
            {
                //Otherwise, send the arguments over to the host
                HostCommunication.SendArgs(args.ToList());
            }
        }
    }
}
