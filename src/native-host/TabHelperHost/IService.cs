using System.Collections.Generic;
using System.ServiceModel;

namespace TabHelperHost
{
    [ServiceContract]
    public interface IService
    {
        [OperationContract]
        void SendArgs(List<string> args);
    }
}