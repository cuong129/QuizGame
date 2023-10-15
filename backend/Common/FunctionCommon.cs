using System.ComponentModel;

namespace QuizGame.Common;

public class FunctionCommon
{
    public static string GetEnumDescription(Enum value)
    {
        try
        {
            var type = value.GetType();
            var name = Enum.GetName(type, value);
            if (name != null)
            {
                var field = type.GetField(name);
                if (field != null && Attribute.GetCustomAttribute(field,
                        typeof(DescriptionAttribute)) is DescriptionAttribute attr)
                {
                    return attr.Description;
                }
            }
        }
        catch { }
        return string.Empty;
    }
}