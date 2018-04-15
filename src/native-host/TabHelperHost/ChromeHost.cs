using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.ServiceModel;
using Newtonsoft.Json;

namespace TabHelperHost
{
    public static class ChromeHost
    {
        public static void Run()
        {
            try
            {
                //Try to bootstrap the service
                BootstrapService();
            }
            catch (AddressAlreadyInUseException)
            {
                //If the address is already in use, there is probably an 'old' instance of the app running.  Find them
                //   all and kill them.
                var me = Process.GetCurrentProcess();
                foreach (var p in Process.GetProcessesByName(me.ProcessName).Where(p => p.Id != me.Id).ToList())
                {
                    p.Kill();
                    p.WaitForExit();
                }

                //Then try to bootstrap again
                BootstrapService();
            }

            //Now we just sit around letting WCF dispatch calls on background threads until we run out of STDIN (meaning Chrome is done with us)
            while (Console.Read() != -1)
            {
            }
        }

        private static void BootstrapService()
        {
            //Create a dummy instance of the service that just calls our delegate
            var svc = new DelegateService(args =>
            {
                Write(new { op = args[0], data = args[1] });
            });

            //Setup the WCF magic
            var serviceHost = new ServiceHost(svc, new Uri("net.pipe://localhost/" + Program.UniqueAppName));
            serviceHost.AddServiceEndpoint(typeof(IService), new NetNamedPipeBinding(), "svc");
            var behaviour = serviceHost.Description.Behaviors.Find<ServiceBehaviorAttribute>();
            behaviour.InstanceContextMode = InstanceContextMode.Single;
            serviceHost.Open();
        }

        //Code taken from: https://stackoverflow.com/a/30880710/385996
        private static void Write(object data)
        {
            var json = JsonConvert.SerializeObject(data, Formatting.None);

            var bytes = System.Text.Encoding.UTF8.GetBytes(json);

            var stdout = Console.OpenStandardOutput();
            stdout.WriteByte((byte)((bytes.Length >> 0) & 0xFF));
            stdout.WriteByte((byte)((bytes.Length >> 8) & 0xFF));
            stdout.WriteByte((byte)((bytes.Length >> 16) & 0xFF));
            stdout.WriteByte((byte)((bytes.Length >> 24) & 0xFF));
            stdout.Write(bytes, 0, bytes.Length);
            stdout.Flush();
        }

        private class DelegateService : IService
        {
            private readonly Action<List<string>> _action;

            public DelegateService(Action<List<string>> action)
            {
                _action = action;
            }
            public void SendArgs(List<string> args)
            {
                _action(args);
            }
        }
    }
}