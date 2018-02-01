using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Xunit;

namespace Mandater.Tests
{
    // Ensuring that xUnit behaves as expected
    public class XUnitFrameworkTests
    {
        [Theory]
        [InlineData(1)]
        [InlineData(3)]
        [InlineData(5)]
        public void IsOddTests(int value)
        {
            Assert.True(IsOdd(value));
        }

        private static bool IsOdd(int value)
        {
            return value % 2 == 1;
        }
    }
}
